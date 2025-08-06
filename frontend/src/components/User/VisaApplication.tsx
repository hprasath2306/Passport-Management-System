import React, { useState } from 'react';
import { countries, visaTypes } from '../../services/mockData';

interface VisaApplicationProps {
  hasPassport: boolean;
}

const VisaApplication: React.FC<VisaApplicationProps> = ({ hasPassport }) => {
  const [formData, setFormData] = useState({
    country: '',
    visaType: '',
    travelDate: '',
    returnDate: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h3>Visa Application Submitted!</h3>
          <p>Your visa application for {formData.country} has been submitted.</p>
          <p><strong>Application ID:</strong> VA{Date.now()}</p>
          <p><strong>Expected Processing Time:</strong> 15-30 working days</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowSuccess(false)}
          >
            Apply for Another Visa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-container">
      <div className="application-header">
        <h2>Visa Application</h2>
        <p>Apply for a visa to travel abroad</p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country" className="form-label">Destination Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="visaType" className="form-label">Visa Type</label>
            <select
              id="visaType"
              name="visaType"
              value={formData.visaType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Visa Type</option>
              {visaTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="travelDate" className="form-label">Travel Date</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnDate" className="form-label">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="form-input"
              min={formData.travelDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="purpose" className="form-label">Purpose of Travel</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            placeholder="Please describe the purpose of your travel..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Visa Application'}
        </button>
      </form>
    </div>
  );
};

export default VisaApplication;