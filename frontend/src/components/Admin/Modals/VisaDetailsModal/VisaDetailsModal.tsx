import React from 'react';
import { X, User, FileText, Calendar, CreditCard, Plane } from 'lucide-react';
import type { BackendVisaApplication } from '../../../../types';
import '../models.css'

interface VisaDetailsModalProps {
  visa: BackendVisaApplication;
  onClose: () => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

export const VisaDetailsModal: React.FC<VisaDetailsModalProps> = ({
  visa,
  onClose,
  formatDate,
  getStatusColor,
  getStatusIcon
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Visa Application Details</h2>
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
                <span className="detail-value">{visa.visaApplicationId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Visa ID:</span>
                <span className="detail-value">{visa.visaId || 'Not assigned'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Passport ID:</span>
                <span className="detail-value">{visa.passportId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${getStatusColor(visa.status)}`}>
                  {getStatusIcon(visa.status)}
                  {visa.status}
                </span>
              </div>
            </div>

            {/* Travel Information */}
            <div className="detail-section">
              <div className="section-header">
                <Plane size={20} />
                <h3>Travel Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">Destination Country:</span>
                <span className="detail-value">{visa.destinationCountry}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Visa Type:</span>
                <span className="detail-value">{visa.visaType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Validity Years:</span>
                <span className="detail-value">{visa.validityYears} years</span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="detail-section">
              <div className="section-header">
                <User size={20} />
                <h3>Personal Information</h3>
              </div>
              <div className="detail-row">
                <span className="detail-label">User ID:</span>
                <span className="detail-value">{visa.userId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">
                  {visa.userFirstName} {visa.userLastName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{visa.userEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{visa.userPhone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Occupation:</span>
                <span className="detail-value">{visa.userOccupation}</span>
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
                <span className="detail-value">{formatDate(visa.applicationDate)}</span>
              </div>
              {visa.issueDate && (
                <div className="detail-row">
                  <span className="detail-label">Issue Date:</span>
                  <span className="detail-value">{formatDate(visa.issueDate)}</span>
                </div>
              )}
              {visa.expiryDate && (
                <div className="detail-row">
                  <span className="detail-label">Expiry Date:</span>
                  <span className="detail-value">{formatDate(visa.expiryDate)}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Created At:</span>
                <span className="detail-value">
                  {new Date(visa.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Updated At:</span>
                <span className="detail-value">
                  {new Date(visa.updatedAt).toLocaleString()}
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
                <span className="detail-value amount">₹{visa.amountPaid}</span>
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