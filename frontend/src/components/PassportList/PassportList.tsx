import React, { useState } from "react";
import { Eye } from "lucide-react";
import { CancellationModal } from "../../pages/AdminDashboard/Modals/CancellationModal/CancellationModal";

interface PassportListProps {
  passportApps: any[];
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  handlePassportStatusChange: (applicationId: number, status: string, comment?: string) => void;
  onViewDetails: (app: any) => void;
}

export const PassportList: React.FC<PassportListProps> = ({ 
  passportApps, 
  formatDate, 
  getStatusColor, 
  getStatusIcon, 
  handlePassportStatusChange,
  onViewDetails 
}) => {
  const [cancellationModal, setCancellationModal] = useState<{
    isOpen: boolean;
    applicationId: number;
    applicantName: string;
  }>({
    isOpen: false,
    applicationId: 0,
    applicantName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (applicationId: number, status: string, applicantName: string) => {
    if (status === 'CANCELLED') {
      setCancellationModal({
        isOpen: true,
        applicationId,
        applicantName
      });
    } else {
      handlePassportStatusChange(applicationId, status);
    }
  };

  const handleCancellationConfirm = async (comment: string) => {
    setLoading(true);
    try {
      await handlePassportStatusChange(cancellationModal.applicationId, 'CANCELLED', comment);
      setCancellationModal({ isOpen: false, applicationId: 0, applicantName: '' });
    } catch (error) {
      console.error('Error cancelling passport:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancellationClose = () => {
    setCancellationModal({ isOpen: false, applicationId: 0, applicantName: '' });
  };

  return (
    <>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Passport ID</th>
              <th>Applicant Name</th>
              <th>Type</th>
              <th>Application Date</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passportApps.map((app: any) => (
              <tr key={app.passportApplicationId}>
                <td>{app.passportApplicationId}</td>
                <td>{app.passportId || 'Not Assigned'}</td>
                <td>{`${app.userFirstName} ${app.userLastName}`}</td>
                <td>{app.passportType}</td>
                <td>{formatDate(app.applicationDate)}</td>
                <td>₹{app.amountPaid}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                  {app.status === 'CANCELLED' && app.cancellationComment && (
                    <div className="cancellation-comment-preview" title={app.cancellationComment}>
                      Reason: {app.cancellationComment.length > 30 
                        ? `${app.cancellationComment.substring(0, 30)}...` 
                        : app.cancellationComment}
                    </div>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(
                        app.passportApplicationId, 
                        e.target.value,
                        `${app.userFirstName} ${app.userLastName}`
                      )}
                      className="status-select"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="ISSUED">Issued</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                    <button 
                      className="btn-icon"
                      title="View Details"
                      onClick={() => onViewDetails(app)}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {passportApps.length === 0 && (
          <div className="no-data">No passport applications found</div>
        )}
      </div>

      <CancellationModal
        isOpen={cancellationModal.isOpen}
        onClose={handleCancellationClose}
        onConfirm={handleCancellationConfirm}
        applicantName={cancellationModal.applicantName}
        applicationId={cancellationModal.applicationId}
        loading={loading}
      />
    </>
  );
};