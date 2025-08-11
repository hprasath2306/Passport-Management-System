import React, { useState } from "react";
import { Eye } from "lucide-react";
import { CancellationModal } from "../../pages/AdminDashboard/Modals/CancellationModal/CancellationModal";

interface VisaListProps {
  visaApps: any[];
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  handleVisaStatusChange: (visaId: string, status: string, comment?: string) => void;
  onViewDetails: (app: any) => void;
}

export const VisaList: React.FC<VisaListProps> = ({ 
  visaApps, 
  formatDate, 
  getStatusColor, 
  getStatusIcon, 
  handleVisaStatusChange,
  onViewDetails 
}) => {
  const [cancellationModal, setCancellationModal] = useState<{
    isOpen: boolean;
    visaId: string;
    applicantName: string;
  }>({
    isOpen: false,
    visaId: '',
    applicantName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (visaId: string, status: string, applicantName: string) => {
    if (status === 'CANCELLED') {
      setCancellationModal({
        isOpen: true,
        visaId,
        applicantName
      });
    } else {
      handleVisaStatusChange(visaId, status);
    }
  };

  const handleCancellationConfirm = async (comment: string) => {
    setLoading(true);
    try {
      await handleVisaStatusChange(cancellationModal.visaId, 'CANCELLED', comment);
      setCancellationModal({ isOpen: false, visaId: '', applicantName: '' });
    } catch (error) {
      console.error('Error cancelling visa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancellationClose = () => {
    setCancellationModal({ isOpen: false, visaId: '', applicantName: '' });
  };

  return (
    <>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Visa ID</th>
              <th>Applicant Name</th>
              <th>Country</th>
              <th>Visa Type</th>
              <th>Application Date</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visaApps.map((app: any) => (
              <tr key={app.visaApplicationId}>
                <td>{app.visaApplicationId}</td>
                <td>{app.visaId}</td>
                <td>{`${app.userFirstName} ${app.userLastName}`}</td>
                <td>{app.destinationCountry}</td>
                <td>{app.visaType}</td>
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
                        app.visaId, 
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
        {visaApps.length === 0 && (
          <div className="no-data">No visa applications found</div>
        )}
      </div>

      <CancellationModal
        isOpen={cancellationModal.isOpen}
        onClose={handleCancellationClose}
        onConfirm={handleCancellationConfirm}
        applicantName={cancellationModal.applicantName}
        applicationId={Number(cancellationModal.visaId)}
        loading={loading}
      />
    </>
  );
};