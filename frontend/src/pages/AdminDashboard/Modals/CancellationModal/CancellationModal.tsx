import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './CancellationModal.css';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
  applicantName: string;
  applicationId: number;
  loading?: boolean;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false
}) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setError('Cancellation reason is required');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please provide a detailed reason (minimum 10 characters)');
      return;
    }

    onConfirm(comment.trim());
  };

  const handleClose = () => {
    setComment('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content cancellation-modal">
        <div className="modal-header">
          <div className="modal-title">
            <AlertTriangle size={24} className="warning-icon" />
            <h3>Cancel Application</h3>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* <div className="cancellation-info">
            <p><strong>Applicant:</strong> {applicantName}</p>
            <p><strong>Application ID:</strong> {applicationId}</p>
          </div> */}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cancellation-comment">
                Reason for Cancellation <span className="required">*</span>
              </label>
              <textarea
                id="cancellation-comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setError('');
                }}
                placeholder="Please provide a detailed reason for cancelling this application..."
                rows={4}
                className={error ? 'error' : ''}
                disabled={loading}
                maxLength={500}
              />
              <div className="char-count">
                {comment.length}/500 characters
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-danger"
                disabled={loading || !comment.trim()}
              >
                {loading ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};