import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { visaService } from "../../services/visaService";
import { useAuth } from "../../context/AuthContext";

interface VisaCancellationProps {
  visaId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const VisaCancellation: React.FC<VisaCancellationProps> = ({
  visaId,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    cancellationReason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user?.userId) {
        throw new Error("User ID not found");
      }

      const cancellationData = {
        visaApplicationId: visaId,
        userId: user.userId,
        cancellationReason: formData.cancellationReason,
        cancellationDate: new Date().toISOString().split("T")[0], // Current date
      };

    //   console.log("Cancellation Data:", cancellationData);

      await visaService.cancelVisa(cancellationData);

      // Reset form
      setFormData({
        cancellationReason: "",
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to cancel visa. Please try again."
      );
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="visa-cancellation-container">
      <div className="cancellation-header">
        <div className="header-content">
          <AlertTriangle size={24} className="warning-icon" />
          <h2>Cancel Visa Application</h2>
        </div>
        {onCancel && (
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="cancellation-form">
        <div className="form-group">
          <label htmlFor="cancellationReason" className="form-label">
            Reason for Cancellation *
          </label>
          <textarea
            id="cancellationReason"
            name="cancellationReason"
            value={formData.cancellationReason}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            placeholder="Please provide a reason for cancelling your visa application..."
            required
          />
          <small className="form-help">
            This information will help us improve our services and process any
            applicable refunds.
          </small>
        </div>

        <div className="refund-info">
          <h4>Refund Information</h4>
          <ul>
            <li>
              Cancellations within 6 months of issue date: 50% refund eligible
            </li>
            <li>Cancellations after 6 months: No refund available</li>
            <li>Processing fees are non-refundable</li>
            <li>Refunds will be processed within 7-10 business days</li>
          </ul>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Keep Visa
            </button>
          )}
          <button
            type="submit"
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Cancellation..." : "Confirm Cancellation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaCancellation;