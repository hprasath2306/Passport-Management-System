import React, { useState } from 'react';
import { mockServiceTypes } from '../../services/mockData';
import type { ServiceType } from '../../types';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const ServiceTypeManagement: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>(mockServiceTypes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<ServiceType>>({
    name: '',
    description: '',
    price: 0,
    processingTime: '',
    status: 'ACTIVE'
  });

  const handleEdit = (service: ServiceType) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleSave = () => {
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, ...formData } as ServiceType : s));
      setEditingId(null);
    } else {
      const { id, ...restFormData } = formData as ServiceType;
      const newService: ServiceType = {
        id: `ST${Date.now()}`,
        ...restFormData
      };
      setServices([...services, newService]);
      setShowAddForm(false);
    }
    setFormData({ name: '', description: '', price: 0, processingTime: '', status: 'ACTIVE' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', description: '', price: 0, processingTime: '', status: 'ACTIVE' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service type?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Service Type Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Add Service Type
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="form-modal">
          <div className="form-container">
            <h3>{editingId ? 'Edit Service Type' : 'Add Service Type'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={3}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Processing Time</label>
                  <input
                    type="text"
                    name="processingTime"
                    value={formData.processingTime || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 30 days"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status || 'ACTIVE'}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <Save size={20} />
                  Save
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCancel}>
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Processing Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>₹{service.price}</td>
                <td>{service.processingTime}</td>
                <td>
                  <span className={`status-badge ${service.status === 'ACTIVE' ? 'status-approved' : 'status-rejected'}`}>
                    {service.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={16} />
                    </button>
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