import React from 'react';
import { X, User, FileText, Calendar, CreditCard } from 'lucide-react';
import type { BackendPassportApplication } from '../../../../types';
import '../models.css'

interface PassportDetailsModalProps {
  passport: BackendPassportApplication;
  onClose: () => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

export const PassportDetailsModal: React.FC<PassportDetailsModalProps> = ({
  passport,
  onClose,
  formatDate,
  getStatusColor,
  getStatusIcon
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Passport Application Details</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            {/* Application Information */}
            <div className="detail-section">
              <div className="section-header">
                <FileText size={20} />
                <h3>Application Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">Application ID:</span>
                <span className="detail-value">{passport.passportApplicationId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Passport ID:</span>
                <span className="detail-value">{passport.passportId || 'Not assigned'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Passport Type:</span>
                <span className="detail-value">{passport.passportType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Service Type ID:</span>
                <span className="detail-value">{passport.serviceTypeId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Booklet Type ID:</span>
                <span className="detail-value">{passport.bookletTypeId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${getStatusColor(passport.status)}`}>
                  {getStatusIcon(passport.status)}
                  {passport.status}
                </span>
              </div>
              {passport.previousPassportId && (
                <div className="detail-row">
                  <span className="detail-label">Previous Passport ID:</span>
                  <span className="detail-value">{passport.previousPassportId}</span>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="detail-section">
              <div className="section-header">
                <User size={20} />
                <h3>Personal Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">User ID:</span>
                <span className="detail-value">{passport.userId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">
                  {passport.userFirstName} {passport.userLastName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{passport.userEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{passport.userPhone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Citizen Type:</span>
                <span className="detail-value">{passport.userCitizenType}</span>
              </div>
            </div>

            {/* Date Information */}
            <div className="detail-section">
              <div className="section-header">
                <Calendar size={20} />
                <h3>Date Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">Application Date:</span>
                <span className="detail-value">{formatDate(passport.applicationDate)}</span>
              </div>
              {passport.issueDate && (
                <div className="detail-row">
                  <span className="detail-label">Issue Date:</span>
                  <span className="detail-value">{formatDate(passport.issueDate)}</span>
                </div>
              )}
              {passport.expiryDate && (
                <div className="detail-row">
                  <span className="detail-label">Expiry Date:</span>
                  <span className="detail-value">{formatDate(passport.expiryDate)}</span>
                </div>
              )}
              {passport.processingDays && (
                <div className="detail-row">
                  <span className="detail-label">Processing Days:</span>
                  <span className="detail-value">{passport.processingDays} days</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Created At:</span>
                <span className="detail-value">
                  {new Date(passport.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Updated At:</span>
                <span className="detail-value">
                  {new Date(passport.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="detail-section">
              <div className="section-header">
                <CreditCard size={20} />
                <h3>Payment Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value amount">₹{passport.amountPaid}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};