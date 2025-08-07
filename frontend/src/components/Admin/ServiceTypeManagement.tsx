import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

const ServiceTypeManagement: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: 'PASSPORT',
    passportType: 'NEW',
    amount: 0,
    processingDays: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/service-types');
        setServices(response.data || []);
      } catch (err) {
        setError('Failed to load service types.');
      }
      setLoading(false);
    };
    fetchServiceTypes();
  }, []);

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      serviceName: service.serviceName,
      serviceCategory: service.serviceCategory,
      passportType: service.passportType,
      amount: service.amount,
      processingDays: service.processingDays,
    });
    setShowAddForm(true);
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        await axiosInstance.put(`/api/service-types/${editingId}`, formData);
        setServices(services.map(s => s.id === editingId ? { ...s, ...formData } : s));
        setEditingId(null);
      } catch (err) {
        setError('Failed to update service type.');
      }
    } else {
      try {
        const response = await axiosInstance.post('/api/service-types', formData);
        setServices([...services, response.data]);
        setShowAddForm(false);
      } catch (err) {
        setError('Failed to add service type.');
      }
    }
    setFormData({ serviceName: '', serviceCategory: 'PASSPORT', passportType: 'NEW', amount: 0, processingDays: 1 });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ serviceName: '', serviceCategory: 'PASSPORT', passportType: 'NEW', amount: 0, processingDays: 1 });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service type?')) {
      try {
        await axiosInstance.delete(`/api/service-types/${id}`);
        setServices(services.filter(s => s.id !== id));
      } catch (err) {
        setError('Failed to delete service type.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  if (loading) {
    return <div className="loading-container">Loading service types...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Service Type Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add Service Type
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="form-modal">
          <div className="form-container">
            <h3>{editingId ? 'Edit Service Type' : 'Add Service Type'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label className="form-label">Service Name</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Service Category</label>
                <select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="PASSPORT">Passport</option>
                  <option value="VISA">Visa</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Passport Type</label>
                <select
                  name="passportType"
                  value={formData.passportType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="NEW">New</option>
                  <option value="RENEWAL">Renewal</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount !== undefined && formData.amount !== null ? String(formData.amount) : ''}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Processing Days</label>
                <input
                  type="number"
                  name="processingDays"
                  value={formData.processingDays !== undefined && formData.processingDays !== null ? String(formData.processingDays) : ''}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-outline" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Category</th>
              <th>Passport Type</th>
              <th>Amount</th>
              <th>Processing Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={service.id || idx}>
                <td>{service.serviceName}</td>
                <td>{service.serviceCategory}</td>
                <td>{service.passportType}</td>
                <td>₹{service.amount}</td>
                <td>{service.processingDays}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit" onClick={() => handleEdit(service)}>Edit</button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(service.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTypeManagement;