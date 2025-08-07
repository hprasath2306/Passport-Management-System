import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Import as Passport,
  Globe,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import PassportApplication from "./PassportApplication";
import VisaApplication from "./VisaApplication";
import { passportService } from "../../services/passportService";
import { visaService } from "../../services/visaService";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "passport" | "visa">(
    "overview"
  );

  const [hasPassport, setHasPassport] = useState(false);
  const [hasVisa, setHasVisa] = useState(false);
  const [visaApplications, setVisaApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch passport status
        const hasPassportResponse = await passportService.getPassportByUserId(user.userId);
        setHasPassport(!!hasPassportResponse);

        // Fetch visa applications
        const visas = await visaService.getVisasByUserId(user.userId);
        setVisaApplications(visas || []);
        setHasVisa((visas || []).length > 0);
      } catch (err) {
        setError("Failed to fetch data from backend.");
        setHasPassport(false);
        setVisaApplications([]);
        setHasVisa(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "PENDING":
        return "status-pending";
      case "PROCESSING":
        return "status-processing";
      case "REJECTED":
        return "status-rejected";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle size={16} />;
      case "PENDING":
        return <Clock size={16} />;
      case "PROCESSING":
        return <AlertCircle size={16} />;
      case "REJECTED":
        return <XCircle size={16} />;
      case "CANCELLED":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
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
            {hasPassport && (
              <button
                className={`tab ${activeTab === "visa" ? "active" : ""}`}
                onClick={() => setActiveTab("visa")}
              >
                <Globe size={20} />
                Visa
              </button>
            )}
          </div>

          <div className="dashboard-content">
            {activeTab === "overview" && (
              <div className="overview-grid">
                <div className="overview-card">
                  <div className="card-icon passport-icon">
                    <Passport size={24} />
                  </div>
                  <div className="card-content">
                    <h3>Passport Status</h3>
                    <p
                      className={hasPassport ? "status-approved" : "status-pending"}
                    >
                      {hasPassport ? "Active" : "Not Applied"}
                    </p>
                  </div>
                </div>
                {hasPassport && (
                  <div className="overview-card">
                    <div className="card-icon visa-icon">
                      <Globe size={24} />
                    </div>
                    <div className="card-content">
                      <h3>Visa Applications</h3>
                      <p>{hasVisa ? "Active" : "Not Applied"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "passport" && (
              <div className="passport-section">
                {/* You may want to fetch and show passport application details here if needed */}
                {!hasPassport ? (
                  <PassportApplication />
                ) : (
                  <div className="application-status">
                    <h3>Your Passport</h3>
                    <div className="status-card">
                      <div className="status-header">
                        <span className={`status-badge ${getStatusColor("APPROVED")}`}>
                          {getStatusIcon("APPROVED")}
                          Active
                        </span>
                      </div>
                      {/* You can add more passport details here if you fetch them from backend */}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "visa" && hasPassport && (
              <div className="visa-section">
                <VisaApplication hasPassport={hasPassport} />

                {visaApplications.length > 0 && (
                  <div className="applications-list">
                    <h3>Your Visa Applications</h3>
                    {visaApplications.map((application: any) => (
                      <div key={application.visaId || application.id} className="application-card">
                        <div className="application-header">
                          <h4>
                            {application.country} - {application.visaType} Visa
                          </h4>
                          <span
                            className={`status-badge ${getStatusColor(application.status)}`}
                          >
                            {getStatusIcon(application.status)}
                            {application.status}
                          </span>
                        </div>
                        <div className="application-details">
                          <p>
                            Application Date:{" "}
                            {application.applicationDate ? new Date(application.applicationDate).toLocaleDateString() : "-"}
                          </p>
                          <p>
                            Expected Date:{" "}
                            {application.expiryDate ? new Date(application.expiryDate).toLocaleDateString() : "-"}
                          </p>
                        </div>
                        {application.status === "APPROVED" && (
                          <div className="application-actions">
                            <button className="btn btn-outline">
                              Download Visa
                            </button>
                            <button className="btn btn-danger">Cancel Visa</button>
                          </div>
                        )}
                      </div>
                    ))}
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
