import React, { useState, useEffect } from 'react';
import { Settings, FileText, BarChart3, Book } from 'lucide-react';
import ServiceTypeManagement from './ServiceTypeManagement';
import BookletTypeManagement from './BookletTypeManagement';
import ApplicationManagement from './ApplicationManagement';
import axiosInstance from '../../services/axiosInstance';
import { Overviewgrid } from '../../components/Overviewgrid/Overviewgrid';

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  cancelledApplications: number;
  totalPassportApplications: number;
  totalVisaApplications: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'booklets' | 'applications'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    cancelledApplications: 0,
    totalPassportApplications: 0,
    totalVisaApplications: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both passport and visa applications
      const [passportResponse, visaResponse] = await Promise.all([
        axiosInstance.get('/api/passport/all'),
        axiosInstance.get('/api/visa/all')
      ]);

      const passportApps = passportResponse.data;
      const visaApps = visaResponse.data;

      // Calculate statistics
      const totalPassportApplications = passportApps.length;
      const totalVisaApplications = visaApps.length;
      const totalApplications = totalPassportApplications + totalVisaApplications;

      // Count by status for passport applications
      const passportStats = passportApps.reduce((acc: any, app: any) => {
        acc[app.status.toLowerCase()] = (acc[app.status.toLowerCase()] || 0) + 1;
        return acc;
      }, {});

      // Count by status for visa applications
      const visaStats = visaApps.reduce((acc: any, app: any) => {
        acc[app.status.toLowerCase()] = (acc[app.status.toLowerCase()] || 0) + 1;
        return acc;
      }, {});

      // Combine statistics
      const combinedStats: DashboardStats = {
        totalApplications,
        totalPassportApplications,
        totalVisaApplications,
        pendingApplications: (passportStats.pending || 0) + (visaStats.pending || 0),
        approvedApplications: (passportStats.issued || 0) + (visaStats.issued || 0),
        cancelledApplications: (passportStats.cancelled || 0) + (visaStats.cancelled || 0)
      };

      setStats(combinedStats);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard statistics');
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
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
          <div className="overview-section">
            {loading && (
              <div className="loading-stats">
                <p>Loading dashboard statistics...</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
                <button onClick={fetchDashboardStats} className="retry-btn">
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <Overviewgrid stats={stats} />
              </>
            )}
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