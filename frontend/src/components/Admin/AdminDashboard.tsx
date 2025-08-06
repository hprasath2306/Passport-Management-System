import React, { useState } from 'react';
import { Settings, FileText, Users, BarChart3, Book } from 'lucide-react';
import ServiceTypeManagement from './ServiceTypeManagement';
import BookletTypeManagement from './BookletTypeManagement';
import ApplicationManagement from './ApplicationManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'booklets' | 'applications'>('overview');

  const stats = {
    totalApplications: 125,
    pendingApplications: 45,
    approvedApplications: 72,
    rejectedApplications: 8
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage passport and visa services</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Settings size={20} />
          Service Types
        </button>
        <button
          className={`tab ${activeTab === 'booklets' ? 'active' : ''}`}
          onClick={() => setActiveTab('booklets')}
        >
          <Book size={20} />
          Booklet Types
        </button>
        <button
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <FileText size={20} />
          Applications
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="stat-card">
              <div className="stat-icon total">
                <FileText size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Applications</h3>
                <p className="stat-number">{stats.totalApplications}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>Pending Review</h3>
                <p className="stat-number">{stats.pendingApplications}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon approved">
                <BarChart3 size={24} />
              </div>
              <div className="stat-content">
                <h3>Approved</h3>
                <p className="stat-number">{stats.approvedApplications}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon rejected">
                <Settings size={24} />
              </div>
              <div className="stat-content">
                <h3>Rejected</h3>
                <p className="stat-number">{stats.rejectedApplications}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && <ServiceTypeManagement />}
        {activeTab === 'booklets' && <BookletTypeManagement />}
        {activeTab === 'applications' && <ApplicationManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;