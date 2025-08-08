import React, { useState } from "react";
import { X } from "lucide-react";
import { countries, visaTypes } from "../../services/mockData";
import { visaService } from "../../services/visaService";
import { useAuth } from "../../context/AuthContext";
import { type PassportDetails } from "../../services/passportService";

interface VisaApplicationProps {
  hasPassport: boolean;
  passportDetails?: PassportDetails | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const VisaApplication: React.FC<VisaApplicationProps> = ({
  hasPassport,
  passportDetails,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    destinationCountry: "",
    visaType: "",
    purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Visa type pricing (you can move this to a service or config)
  const visaPricing: Record<string, number> = {
    Tourist: 1500,
    Business: 2000,
    Student: 1000,
    Work: 3000,
    Transit: 500,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user?.userId || !passportDetails?.passportId) {
        throw new Error("User ID or Passport ID not found");
      }

      const visaApplicationData = {
        userId: user.userId,
        passportId: passportDetails.passportId,
        destinationCountry: formData.destinationCountry,
        visaType: formData.visaType,
        amountPaid: visaPricing[formData.visaType] || 150,
      };

      await visaService.applyVisa(visaApplicationData);

      // Reset form
      setFormData({
        destinationCountry: "",
        visaType: "",
        purpose: "",
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to submit visa application. Please try again."
      );
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!hasPassport) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h3>Passport Required</h3>
          <p>You need to have a valid passport before applying for a visa.</p>
          <p>Please apply for a passport first from the Passport section.</p>
        </div>
      </div>
    );
  }

  const selectedVisaPrice = visaPricing[formData.visaType] || 0;

  return (
    <div className="visa-application-container">
      <div className="application-header">
        <h2>Apply for New Visa</h2>
        {onCancel && (
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="destinationCountry" className="form-label">
              Destination Country *
            </label>
            <select
              id="destinationCountry"
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="visaType" className="form-label">
              Visa Type *
            </label>
            <select
              id="visaType"
              name="visaType"
              value={formData.visaType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Visa Type</option>
              {visaTypes.map((type) => (
                <option key={type} value={type}>
                  {type} - Rs. {visaPricing[type] || 1500}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="purpose" className="form-label">
            Purpose of Travel
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            placeholder="Please describe the purpose of your travel..."
          />
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting Application..."
              : `Submit Application - Rs. ${selectedVisaPrice}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaApplication;