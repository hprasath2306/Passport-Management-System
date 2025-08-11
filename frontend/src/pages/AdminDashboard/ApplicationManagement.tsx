import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { getStatusColor, getStatusIcon } from "../../utils/data";
import { PassportList } from "../../components/PassportList/PassportList";
import { VisaList } from "../../components/VisaList/VisaList";
import { PassportDetailsModal } from "./Modals/PassportDetailsModal/PassportDetailsModal";
import { VisaDetailsModal } from "./Modals/VisaDetailsModal/VisaDetailsModal";
import type { PassportDetails, AdminVisaApplication } from "../../types";
import "./ApplicationManagement.css";
import { adminService } from "../../services/adminService";

const ApplicationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"passport" | "visa">("passport");
  const [passportApps, setPassportApps] = useState<PassportDetails[]>([]);
  const [visaApps, setVisaApps] = useState<AdminVisaApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [selectedPassport, setSelectedPassport] =
    useState<PassportDetails | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<AdminVisaApplication | null>(
    null
  );
  const [showPassportModal, setShowPassportModal] = useState(false);
  const [showVisaModal, setShowVisaModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "passport") {
        const response = await axiosInstance.get("/api/passport/all");
        setPassportApps(response.data);
      } else {
        const response = await axiosInstance.get("/api/visa/all");
        setVisaApps(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch applications");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePassportStatusChange = async (
    applicationId: number,
    newStatus: string,
    cancellationComment?: string
  ) => {
    try {
      await adminService.updatePassportStatus(
        applicationId,
        newStatus,
        cancellationComment
      );

      // Update local state
      setPassportApps((apps) =>
        apps.map((app) =>
          app.passportApplicationId === applicationId
            ? {
                ...app,
                status: newStatus as any,
                // Add cancellation comment to local state if provided
                ...(cancellationComment && { cancellationComment }),
              }
            : app
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status");
      console.error("Error updating passport status:", err);
      // Re-throw the error so the modal can handle it
      throw err;
    }
  };

  const handleVisaStatusChange = async (
    visaId: string,
    newStatus: string,
    cancellationComment?: string
  ) => {
    try {
      // Use the updated adminService method
      await adminService.updateVisaStatus(
        visaId,
        newStatus,
        cancellationComment
      );

      // Update local state
      setVisaApps((apps) =>
        apps.map((app) =>
          app.visaId === visaId
            ? {
                ...app,
                status: newStatus as any,
                // Add cancellation comment to local state if provided
                ...(cancellationComment && { cancellationComment }),
              }
            : app
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update visa status");
      console.error("Error updating visa status:", err);
      // Re-throw the error so the modal can handle it
      throw err;
    }
  };

  const handleViewPassportDetails = (passport: PassportDetails) => {
    setSelectedPassport(passport);
    setShowPassportModal(true);
  };

  const handleViewVisaDetails = (visa: AdminVisaApplication) => {
    setSelectedVisa(visa);
    setShowVisaModal(true);
  };

  const closePassportModal = () => {
    setShowPassportModal(false);
    setSelectedPassport(null);
  };

  const closeVisaModal = () => {
    setShowVisaModal(false);
    setSelectedVisa(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="management-container">
        <div className="loading">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Application Management</h2>
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "passport" ? "active" : ""}`}
            onClick={() => setActiveTab("passport")}
          >
            Passport Applications
          </button>
          <button
            className={`tab-btn ${activeTab === "visa" ? "active" : ""}`}
            onClick={() => setActiveTab("visa")}
          >
            Visa Applications
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchApplications} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {activeTab === "passport" && (
        <PassportList
          passportApps={passportApps}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          handlePassportStatusChange={handlePassportStatusChange}
          onViewDetails={handleViewPassportDetails}
        />
      )}

      {activeTab === "visa" && (
        <VisaList
          visaApps={visaApps}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          handleVisaStatusChange={handleVisaStatusChange}
          onViewDetails={handleViewVisaDetails}
        />
      )}

      {/* Modals */}
      {showPassportModal && selectedPassport && (
        <PassportDetailsModal
          passport={selectedPassport}
          onClose={closePassportModal}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}

      {showVisaModal && selectedVisa && (
        <VisaDetailsModal
          visa={selectedVisa}
          onClose={closeVisaModal}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}
    </div>
  );
};

export default ApplicationManagement;
