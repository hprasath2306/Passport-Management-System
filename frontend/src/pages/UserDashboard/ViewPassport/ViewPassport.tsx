import React from "react";
import {
  Import as Passport,
  Calendar,
  CreditCard,
  User,
  Mail,
  Phone,
  Hash,
  Clock,
  MapPin,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import type { PassportDetails } from "../../../types/index";
import {
  getStatusColor,
  getStatusIcon,
  isPassportExpired,
} from "../../../utils/data";
import "./ViewPassport.css";

interface ViewPassportProps {
  passportDetails: PassportDetails;
  effectiveStatus?: string | null;
  onRenewal?: () => void;
  renewalLoading?: boolean;
  renewalError?: string | null;
}

export const ViewPassport: React.FC<ViewPassportProps> = ({
  passportDetails,
  effectiveStatus,
  onRenewal,
  renewalLoading,
  renewalError,
}) => {
  const displayStatus = effectiveStatus || passportDetails.status;
  const isExpired = isPassportExpired(passportDetails.expiryDate || null);
  const isCancelled = displayStatus === "CANCELLED";

  return (
    <div className="passport-details-container">
      {/* Cancellation Alert for Cancelled Passports */}

      {/* Expiry Warning for Expired Passports */}
      {isExpired && !isCancelled && (
        <div className="expiry-alert">
          <div className="alert-content">
            <AlertTriangle size={24} className="alert-icon" />
            <div className="alert-text">
              <h4>Passport Expired</h4>
              <p>
                Your passport expired on{" "}
                {new Date(passportDetails.expiryDate!).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
                . You need to renew it to apply for visas or travel
                internationally.
              </p>
            </div>
            {onRenewal && (
              <button
                className="btn btn-primary renewal-btn"
                onClick={onRenewal}
                disabled={renewalLoading}
              >
                <RefreshCw size={16} />
                {renewalLoading ? "Renewing..." : "Renew Passport"}
              </button>
            )}
          </div>
          {renewalError && <div className="renewal-error">{renewalError}</div>}
        </div>
      )}

      <div className="passport-card">
        <div className="passport-card-header">
          <div className="passport-header-left">
            <div className="passport-icon-large">
              <Passport size={32} />
            </div>
            <div>
              <h2>Indian Passport</h2>
              <p className="passport-subtitle">Republic of India</p>
            </div>
          </div>
          <div className="passport-status-badge">
            <span className={`status-badge ${getStatusColor(displayStatus)}`}>
              {getStatusIcon(displayStatus)}
              {displayStatus}
            </span>
          </div>
        </div>

        <div className="passport-card-body">
          <div className="passport-info-grid">
            {/* Personal Information Section */}
            <div className="info-section">
              <h3 className="section-title">
                <User size={18} />
                Personal Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <div>
                    <span className="info-label">Full Name</span>
                    <span className="info-value">
                      {passportDetails.userFirstName}{" "}
                      {passportDetails.userLastName}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <div>
                    <span className="info-label">Citizenship</span>
                    <span className="info-value">
                      {passportDetails.userCitizenType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Mail size={18} />
                Contact Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <Mail size={16} className="info-icon" />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">
                      {passportDetails.userEmail}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={16} className="info-icon" />
                  <div>
                    <span className="info-label">Phone</span>
                    <span className="info-value">
                      {passportDetails.userPhone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Details Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Hash size={18} />
                Passport Details
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <div>
                    <span className="info-label">Passport Number</span>
                    <span className="info-value passport-number">
                      {passportDetails.passportId || "Not Assigned"}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <div>
                    <span className="info-label">Type</span>
                    <span className="info-value passport-type">
                      {passportDetails.passportType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Calendar size={18} />
                Important Dates
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <div>
                    <span className="info-label">Application Date</span>
                    <span className="info-value">
                      {new Date(
                        passportDetails.applicationDate
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                {passportDetails.issueDate && (
                  <div className="info-item">
                    <div>
                      <span className="info-label">Issue Date</span>
                      <span className="info-value">
                        {new Date(passportDetails.issueDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {passportDetails.expiryDate && (
                  <div className="info-item">
                    <div>
                      <span className="info-label">Expiry Date</span>
                      <span
                        className={`info-value ${
                          isExpired ? "expiry-warning" : ""
                        }`}
                      >
                        {new Date(
                          passportDetails.expiryDate
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        {isExpired && (
                          <span className="expiry-warning"> (Expired)</span>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment & Processing Section */}
            <div className="info-section">
              <h3 className="section-title">
                <CreditCard size={18} />
                Payment & Processing
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <div>
                    <span className="info-label">Amount Paid</span>
                    <span className="info-value amount">
                      ₹{passportDetails.amountPaid}
                    </span>
                  </div>
                </div>
                {passportDetails.processingDays && (
                  <div className="info-item">
                    <Clock size={16} className="info-icon" />
                    <div>
                      <span className="info-label">Processing Time</span>
                      <span className="info-value">
                        {passportDetails.processingDays} days
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Previous Passport Section */}
            {passportDetails.previousPassportId && (
              <div className="info-section">
                <h3 className="section-title">
                  <MapPin size={18} />
                  Previous Passport
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <div>
                      <span className="info-label">Previous Passport ID</span>
                      <span className="info-value">
                        {passportDetails.previousPassportId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="passport-actions">
            {displayStatus === "PENDING" && (
              <div className="info-message">
                <Clock size={16} />
                <span>Your passport application is being processed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
