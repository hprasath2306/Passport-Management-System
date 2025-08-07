import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

const BookletTypeManagement: React.FC = () => {
  const [booklets, setBooklets] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    pages: 30,
    idFormat: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookletTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/booklet-types');
        setBooklets(response.data || []);
      } catch (err) {
        setError('Failed to load booklet types.');
      }
      setLoading(false);
    };
    fetchBookletTypes();
  }, []);

  const handleEdit = (booklet: any) => {
    setEditingId(booklet.id);
    setFormData({
      pages: booklet.pages,
      idFormat: booklet.idFormat,
    });
    setShowAddForm(true);
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        await axiosInstance.put(`/api/booklet-types/${editingId}`, formData);
        setBooklets(booklets.map(b => b.id === editingId ? { ...b, ...formData } : b));
        setEditingId(null);
      } catch (err) {
        setError('Failed to update booklet type.');
      }
    } else {
      try {
        const response = await axiosInstance.post('/api/booklet-types', formData);
        setBooklets([...booklets, response.data]);
        setShowAddForm(false);
      } catch (err) {
        setError('Failed to add booklet type.');
      }
    }
    setFormData({ pages: 30, idFormat: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ pages: 30, idFormat: '' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booklet type?')) {
      try {
        await axiosInstance.delete(`/api/booklet-types/${id}`);
        setBooklets(booklets.filter(b => b.id !== id));
      } catch (err) {
        setError('Failed to delete booklet type.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  if (loading) {
    return <div className="loading-container">Loading booklet types...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Booklet Type Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add Booklet Type
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="form-modal">
          <div className="form-container">
            <h3>{editingId ? 'Edit Booklet Type' : 'Add Booklet Type'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label className="form-label">Pages</label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="form-input"
                  min="24"
                  max="200"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">ID Format</label>
                <input
                  type="text"
                  name="idFormat"
                  value={formData.idFormat}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., FPS-30XXXX"
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
              <th>Pages</th>
              <th>ID Format</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booklets.map((booklet, idx) => (
              <tr key={booklet.id || idx}>
                <td>{booklet.pages}</td>
                <td>{booklet.idFormat}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit" onClick={() => handleEdit(booklet)}>Edit</button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(booklet.id)}>Delete</button>
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