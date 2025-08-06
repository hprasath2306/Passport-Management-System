import React, { useState } from 'react';
import { mockBookletTypes } from '../../services/mockData';
import type { BookletType } from '../../types';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const BookletTypeManagement: React.FC = () => {
  const [booklets, setBooklets] = useState<BookletType[]>(mockBookletTypes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<BookletType>>({
    name: '',
    pages: 36,
    validity: '',
    price: 0,
    status: 'ACTIVE'
  });

  const handleEdit = (booklet: BookletType) => {
    setEditingId(booklet.id);
    setFormData(booklet);
  };

  const handleSave = () => {
    if (editingId) {
      setBooklets(booklets.map(b => b.id === editingId ? { ...b, ...formData } as BookletType : b));
      setEditingId(null);
    } else {
      const { id, ...restFormData } = formData as BookletType;
      const newBooklet: BookletType = {
        id: `BT${Date.now()}`,
        ...restFormData
      };
      setBooklets([...booklets, newBooklet]);
      setShowAddForm(false);
    }
    setFormData({ name: '', pages: 36, validity: '', price: 0, status: 'ACTIVE' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', pages: 36, validity: '', price: 0, status: 'ACTIVE' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booklet type?')) {
      setBooklets(booklets.filter(b => b.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Booklet Type Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Add Booklet Type
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="form-modal">
          <div className="form-container">
            <h3>{editingId ? 'Edit Booklet Type' : 'Add Booklet Type'}</h3>
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
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pages</label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages || ''}
                    onChange={handleChange}
                    className="form-input"
                    min="24"
                    max="200"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Validity</label>
                  <input
                    type="text"
                    name="validity"
                    value={formData.validity || ''}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 10 years"
                    required
                  />
                </div>
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
              <th>Pages</th>
              <th>Validity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booklets.map(booklet => (
              <tr key={booklet.id}>
                <td>{booklet.name}</td>
                <td>{booklet.pages}</td>
                <td>{booklet.validity}</td>
                <td>₹{booklet.price}</td>
                <td>
                  <span className={`status-badge ${booklet.status === 'ACTIVE' ? 'status-approved' : 'status-rejected'}`}>
                    {booklet.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(booklet)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(booklet.id)}
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

export default BookletTypeManagement;