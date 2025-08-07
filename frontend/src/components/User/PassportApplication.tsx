import React, { useState, useEffect } from 'react';
import { passportService } from '../../services/passportService';
import axiosInstance from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const PassportApplication: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    serviceTypeId: '',
    bookletTypeId: '',
    isRenewal: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [bookletTypes, setBookletTypes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch service types and booklet types from backend
    const fetchTypes = async () => {
      try {
        const [serviceRes, bookletRes] = await Promise.all([
          axiosInstance.get('/api/service-types'),
          axiosInstance.get('/api/booklet-types'),
        ]);
        setServiceTypes(serviceRes.data || []);
        setBookletTypes(bookletRes.data || []);
      } catch (err) {
        setError('Failed to load types.');
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    // Validate IDs
    if (!formData.serviceTypeId || !formData.bookletTypeId) {
      setError('Please select both service type and booklet type.');
      setIsSubmitting(false);
      return;
    }
    try {
      const payload = {
        userId: user?.userId,
        serviceTypeId: Number(formData.serviceTypeId),
        bookletTypeId: Number(formData.bookletTypeId),
        passportType: formData.isRenewal ? 'RENEWAL' : 'NEW',
      };
      await passportService.applyPassport(payload);
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to submit application.');
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const selectedService = serviceTypes.find((s) => String(s.id) === formData.serviceTypeId);
  const selectedBooklet = bookletTypes.find((b) => String(b.id) === formData.bookletTypeId);
  const totalAmount = (selectedService?.amount || 0) + (selectedBooklet?.price || 0);

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h3>Application Submitted Successfully!</h3>
          <p>Your passport application has been submitted.</p>
          <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>
            You can apply for visa now
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
      {error && <div className="error-message">{error}</div>}
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
          <label htmlFor="serviceTypeId" className="form-label">Service Type</label>
          <select
            id="serviceTypeId"
            name="serviceTypeId"
            value={formData.serviceTypeId}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Service Type</option>
            {serviceTypes.map((service) => (
              <option key={service.serviceTypeId} value={service.serviceTypeId}>
                {service.serviceName || service.name || 'Service'} - ₹{service.amount || service.price || 0} ({service.processingDays || service.processingTime || '-'} days)
              </option>
            ))}
          </select>
          {selectedService && (
            <div className="service-details">
              <p className="service-description">{selectedService.description}</p>
              <p className="service-price">Processing Time: {selectedService.processingDays} days</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="bookletTypeId" className="form-label">Booklet Type</label>
          <select
            id="bookletTypeId"
            name="bookletTypeId"
            value={formData.bookletTypeId}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Booklet Type</option>
            {bookletTypes.map((booklet) => (
              <option key={booklet.bookletTypeId} value={booklet.bookletTypeId}>
                {booklet.pages} pages - {booklet.idFormat}
              </option>
            ))}
          </select>
          {selectedBooklet && (
            <div className="service-details">
              <p className="service-description">
                {selectedBooklet.pages} pages passport valid for {selectedBooklet.validity || '10 years'}
              </p>
            </div>
          )}
        </div>
        {totalAmount > 0 && (
          <div className="amount-summary">
            <div className="summary-row">
              <span>Service Fee:</span>
              <span>₹{selectedService?.amount || 0}</span>
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
          disabled={isSubmitting || !formData.serviceTypeId || !formData.bookletTypeId}
        >
          {isSubmitting ? 'Submitting...' : `Submit Application${totalAmount > 0 ? ` (₹${totalAmount})` : ''}`}
        </button>
      </form>
    </div>
  );
};

export default PassportApplication;