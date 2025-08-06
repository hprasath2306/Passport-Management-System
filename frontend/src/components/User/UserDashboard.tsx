import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Import as Passport, Globe, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PassportApplication from './PassportApplication';
import VisaApplication from './VisaApplication';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'passport' | 'visa'>('overview');

  // Mock data for user's applications
  const hasPassport = true; // Mock: user has passport
  const hasPassportApplication = false; // Mock: no pending passport application
  type VisaStatus = 'APPROVED' | 'PENDING' | 'PROCESSING' | 'REJECTED' | 'CANCELLED';

  const visaApplications: {
    id: string;
    country: string;
    visaType: string;
    status: VisaStatus;
    applicationDate: string;
    expectedDate: string;
  }[] = [
    {
      id: 'VA001',
      country: 'United States',
      visaType: 'Tourist',
      status: 'PENDING',
      applicationDate: '2024-01-20',
      expectedDate: '2024-02-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'status-approved';
      case 'PENDING': return 'status-pending';
      case 'PROCESSING': return 'status-processing';
      case 'REJECTED': return 'status-rejected';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle size={16} />;
      case 'PENDING': return <Clock size={16} />;
      case 'PROCESSING': return <AlertCircle size={16} />;
      case 'REJECTED': return <XCircle size={16} />;
      case 'CANCELLED': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName} {user?.lastName}</h1>
        <p>Manage your passport and visa applications</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FileText size={20} />
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'passport' ? 'active' : ''}`}
          onClick={() => setActiveTab('passport')}
        >
          <Passport size={20} />
          Passport
        </button>
        <button
          className={`tab ${activeTab === 'visa' ? 'active' : ''}`}
          onClick={() => setActiveTab('visa')}
        >
          <Globe size={20} />
          Visa
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="overview-card">
              <div className="card-icon passport-icon">
                <Passport size={24} />
              </div>
              <div className="card-content">
                <h3>Passport Status</h3>
                <p className={hasPassport ? 'status-approved' : 'status-pending'}>
                  {hasPassport ? 'Active' : 'Not Applied'}
                </p>
                {hasPassport && (
                  <small>Passport No: M1234567</small>
                )}
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon visa-icon">
                <Globe size={24} />
              </div>
              <div className="card-content">
                <h3>Visa Applications</h3>
                <p>{visaApplications.length} Active</p>
                <small>
                  {visaApplications.length > 0 
                    ? `Latest: ${visaApplications[0].country}` 
                    : 'No applications'
                  }
                </small>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'passport' && (
          <div className="passport-section">
            {!hasPassportApplication ? (
              <PassportApplication />
            ) : (
              <div className="application-status">
                <h3>Your Passport Application</h3>
                <div className="status-card">
                  <div className="status-header">
                    <span className={`status-badge ${getStatusColor('PROCESSING')}`}>
                      {getStatusIcon('PROCESSING')}
                      Processing
                    </span>
                  </div>
                  <p>Application ID: PA001</p>
                  <p>Expected completion: March 15, 2024</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'visa' && (
          <div className="visa-section">
            <VisaApplication hasPassport={hasPassport} />
            
            {visaApplications.length > 0 && (
              <div className="applications-list">
                <h3>Your Visa Applications</h3>
                {visaApplications.map(application => (
                  <div key={application.id} className="application-card">
                    <div className="application-header">
                      <h4>{application.country} - {application.visaType} Visa</h4>
                      <span className={`status-badge ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </div>
                    <div className="application-details">
                      <p>Application Date: {new Date(application.applicationDate).toLocaleDateString()}</p>
                      <p>Expected Date: {new Date(application.expectedDate).toLocaleDateString()}</p>
                    </div>
                    {application.status === 'APPROVED' && (
                      <div className="application-actions">
                        <button className="btn btn-outline">Download Visa</button>
                        <button className="btn btn-danger">Cancel Visa</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;