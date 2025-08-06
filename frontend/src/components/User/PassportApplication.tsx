import React, { useState } from 'react';
import { mockServiceTypes, mockBookletTypes } from '../../services/mockData';

const PassportApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    bookletType: '',
    isRenewal: false
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const selectedService = mockServiceTypes.find(s => s.id === formData.serviceType);
  const selectedBooklet = mockBookletTypes.find(b => b.id === formData.bookletType);
  const totalAmount = (selectedService?.price || 0) + (selectedBooklet?.price || 0);

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h3>Application Submitted Successfully!</h3>
          <p>Your passport application has been submitted.</p>
          <p><strong>Application ID:</strong> PA{Date.now()}</p>
          <p><strong>Expected Processing Time:</strong> {selectedService?.processingTime}</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowSuccess(false)}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-container">
      <div className="application-header">
        <h2>Passport Application</h2>
        <p>Apply for a new passport or renew your existing one</p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isRenewal"
              checked={formData.isRenewal}
              onChange={handleChange}
              className="checkbox"
            />
            This is a passport renewal
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="serviceType" className="form-label">Service Type</label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Service Type</option>
            {mockServiceTypes.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - ₹{service.price} ({service.processingTime})
              </option>
            ))}
          </select>
          {selectedService && (
            <div className="service-details">
              <p className="service-description">{selectedService.description}</p>
              <p className="service-price">Processing Time: {selectedService.processingTime}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bookletType" className="form-label">Booklet Type</label>
          <select
            id="bookletType"
            name="bookletType"
            value={formData.bookletType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Booklet Type</option>
            {mockBookletTypes.map(booklet => (
              <option key={booklet.id} value={booklet.id}>
                {booklet.name} - ₹{booklet.price} (Valid for {booklet.validity})
              </option>
            ))}
          </select>
          {selectedBooklet && (
            <div className="service-details">
              <p className="service-description">
                {selectedBooklet.pages} pages passport valid for {selectedBooklet.validity}
              </p>
            </div>
          )}
        </div>

        {totalAmount > 0 && (
          <div className="amount-summary">
            <div className="summary-row">
              <span>Service Fee:</span>
              <span>₹{selectedService?.price || 0}</span>
            </div>
            <div className="summary-row">
              <span>Booklet Fee:</span>
              <span>₹{selectedBooklet?.price || 0}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting || !formData.serviceType || !formData.bookletType}
        >
          {isSubmitting ? 'Submitting...' : `Submit Application ${totalAmount > 0 ? `(₹${totalAmount})` : ''}`}
        </button>
      </form>
    </div>
  );
};

export default PassportApplication;