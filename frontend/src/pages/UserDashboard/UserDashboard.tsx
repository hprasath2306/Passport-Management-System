import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Import as Passport,
  Globe,
  FileText,
  Plus,
  XCircle,
} from "lucide-react";
import PassportApplication from "./PassportApplication";
import VisaApplication from "./VisaApplication";
import VisaCancellation from "./VisaCancellation/VisaCancellation";
import { userService } from "../../services/userService";
import {
  getStatusColor,
  getStatusIcon,
  getEffectivePassportStatus,
  isPassportExpired,
} from "../../utils/data";
import { ViewPassport } from "./ViewPassport/ViewPassport";
import type { PassportDetails } from "../../types";
import "./UserDashboard.css";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "passport" | "visa">(
    "overview"
  );

  const [passportDetails, setPassportDetails] =
    useState<PassportDetails | null>(null);
  const [hasVisa, setHasVisa] = useState(false);
  const [visaApplications, setVisaApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renewalLoading, setRenewalLoading] = useState(false);
  const [renewalError, setRenewalError] = useState<string | null>(null);
  const [showVisaApplication, setShowVisaApplication] = useState(false);
  const [showCancellation, setShowCancellation] = useState<{
    show: boolean;
    visaId?: number;
  }>({ show: false });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch passport details
        const passportData = await userService.getPassportByUserId(user.userId);
        setPassportDetails(passportData);

        // Fetch visa applications
        const visas = await userService.getVisasByUserId(user.userId);
        setVisaApplications(visas || []);
        setHasVisa((visas || []).length > 0);
      } catch (err) {
        setError("Failed to fetch data from backend.");
        setPassportDetails(null);
        setVisaApplications([]);
        setHasVisa(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.userId]);

  const handleRenewal = async () => {
    if (!user?.userId || !passportDetails) return;

    setRenewalLoading(true);
    setRenewalError(null);

    try {
      await userService.renewPassport(user.userId);
      // Refresh passport details after renewal
      const updatedPassportData = await userService.getPassportByUserId(
        user.userId
      );
      setPassportDetails(updatedPassportData);
    } catch (err: any) {
      setRenewalError(
        err.response?.data?.message ||
          "Failed to renew passport. Please try again."
      );
    }

    setRenewalLoading(false);
  };

  const handleVisaApplicationSuccess = async () => {
    // Refresh visa applications after successful submission
    if (user?.userId) {
      const visas = await userService.getVisasByUserId(user.userId);
      setVisaApplications(visas || []);
      setHasVisa((visas || []).length > 0);
    }
    setShowVisaApplication(false);
  };

  const handleCancellationSuccess = async () => {
    // Refresh visa applications after successful cancellation
    if (user?.userId) {
      const visas = await userService.getVisasByUserId(user.userId);
      setVisaApplications(visas || []);
      setHasVisa((visas || []).length > 0);
    }
    setShowCancellation({ show: false });
  };

  const effectiveStatus = passportDetails
    ? getEffectivePassportStatus(
        passportDetails.status,
        passportDetails.expiryDate || null
      )
    : null;

  const isExpired =
    passportDetails && isPassportExpired(passportDetails.expiryDate || null);
  const canApplyForVisa =
    passportDetails && effectiveStatus === "ISSUED" && !isExpired;

  const canCancelVisa = (visa: any) => {
    return (
      visa.status === "PENDING" ||
      visa.status === "APPROVED" ||
      visa.status === "ISSUED"
    );
  };

  return (
    <div className="dashboard">
      {loading ? (
        <div className="dashboard-loading">Loading...</div>
      ) : error ? (
        <div className="dashboard-error">{error}</div>
      ) : (
        <>
          <div className="dashboard-header">
            <h1>
              Welcome, {user?.firstName} {user?.lastName}
            </h1>
            <p>Manage your passport and visa applications</p>
          </div>

          <div className="dashboard-tabs">
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <FileText size={20} />
              Overview
            </button>
            <button
              className={`tab ${activeTab === "passport" ? "active" : ""}`}
              onClick={() => setActiveTab("passport")}
            >
              <Passport size={20} />
              Passport
            </button>
            {canApplyForVisa && (
              <button
                className={`tab ${activeTab === "visa" ? "active" : ""}`}
                onClick={() => setActiveTab("visa")}
              >
                <Globe size={20} />
                Visa Applications
              </button>
            )}
          </div>

          <div className="dashboard-content">
            {activeTab === "overview" && (
              <div className="overview-section">
                <div className="overview-grid">
                  <div className="overview-card">
                    <div className="card-icon passport-icon">
                      <Passport size={24} />
                    </div>
                    <div className="card-content">
                      <h3>Passport Status</h3>
                      <p
                        className={
                          effectiveStatus
                            ? getStatusColor(effectiveStatus)
                            : "status-pending"
                        }
                      >
                        {effectiveStatus || "Not Applied"}
                      </p>
                      {isExpired && (
                        <small className="expiry-warning">
                          Expired on{" "}
                          {new Date(
                            passportDetails!.expiryDate!
                          ).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  </div>
                  {canApplyForVisa && (
                    <div className="overview-card">
                      <div className="card-icon visa-icon">
                        <Globe size={24} />
                      </div>
                      <div className="card-content">
                        <h3>Visa Applications</h3>
                        <p>
                          {hasVisa
                            ? `${visaApplications.length} Applications`
                            : "No Applications"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "passport" && (
              <div className="passport-section">
                {!passportDetails ? (
                  <PassportApplication />
                ) : (
                  <ViewPassport
                    passportDetails={passportDetails}
                    effectiveStatus={effectiveStatus}
                    onRenewal={handleRenewal}
                    renewalLoading={renewalLoading}
                    renewalError={renewalError}
                  />
                )}
              </div>
            )}

            {activeTab === "visa" && canApplyForVisa && (
              <div className="visa-section">
                <div className="visa-header">
                  <h2>Visa Applications</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowVisaApplication(true)}
                  >
                    <Plus size={20} />
                    Apply for New Visa
                  </button>
                </div>

                {showVisaApplication && (
                  <div className="visa-application-modal">
                    <VisaApplication
                      hasPassport={true}
                      passportDetails={passportDetails}
                      onSuccess={handleVisaApplicationSuccess}
                      onCancel={() => setShowVisaApplication(false)}
                    />
                  </div>
                )}

                {showCancellation.show && (
                  <div className="visa-cancellation-modal">
                    <VisaCancellation
                      visaId={showCancellation.visaId!}
                      onSuccess={handleCancellationSuccess}
                      onCancel={() => setShowCancellation({ show: false })}
                    />
                  </div>
                )}

                {visaApplications.length > 0 ? (
                  <div className="applications-list">
                    <h3>Your Visa Applications ({visaApplications.length})</h3>
                    <div className="applications-grid">
                      {visaApplications.map((application: any) => (
                        <div
                          key={application.visaId || application.id}
                          className="application-card"
                        >
                          {application.status === "CANCELLED" && (
                            <div className="cancellation-alert">
                              <div className="alert-content">
                                <XCircle size={24} className="alert-icon" />
                                <div className="alert-text">
                                  <h4>Visa Application Cancelled</h4>
                                  <p>
                                    Your visa application has been cancelled by
                                    the admin.
                                  </p>
                                  {application.cancellationComment && (
                                    <div className="cancellation-reason">
                                      <strong>Reason:</strong>{" "}
                                      {application.cancellationComment}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="application-header">
                            <h4>
                              {application.destinationCountry ||
                                application.country}{" "}
                              - {application.visaType} Visa
                            </h4>
                            <span
                              className={`status-badge ${getStatusColor(
                                application.status
                              )}`}
                            >
                              {getStatusIcon(application.status)}
                              {application.status}
                            </span>
                          </div>
                          <div className="application-details">
                            <p>
                              <strong>Application ID:</strong>{" "}
                              {application.visaId || application.id}
                            </p>
                            <p>
                              <strong>Application Date:</strong>{" "}
                              {application.applicationDate
                                ? new Date(
                                    application.applicationDate
                                  ).toLocaleDateString()
                                : "-"}
                            </p>
                            <p>
                              <strong>Amount Paid:</strong> Rs.{" "}
                              {application.amountPaid || 0}
                            </p>
                            {application.expiryDate && (
                              <p>
                                <strong>Expiry Date:</strong>{" "}
                                {new Date(
                                  application.expiryDate
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="application-actions">
                            {application.status === "APPROVED" && (
                              <button className="btn btn-outline">
                                Download Visa
                              </button>
                            )}
                            {canCancelVisa(application) && (
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  setShowCancellation({
                                    show: true,
                                    visaId:
                                      application.visaId || application.id,
                                  })
                                }
                              >
                                Cancel Visa
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-applications">
                    <Globe size={48} />
                    <h3>No Visa Applications</h3>
                    <p>
                      You haven't applied for any visas yet. Click "Apply for
                      New Visa" to get started.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
