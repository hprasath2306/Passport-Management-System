import React, { useState } from 'react';
import { mockPassportApplications, mockVisaApplications } from '../../services/mockData';
import type { PassportApplication, VisaApplication } from '../../types';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const ApplicationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'passport' | 'visa'>('passport');
  const [passportApps, setPassportApps] = useState<PassportApplication[]>(mockPassportApplications);
  const [visaApps, setVisaApps] = useState<VisaApplication[]>(mockVisaApplications);

  const handleStatusChange = (id: string, newStatus: string, type: 'passport' | 'visa') => {
    if (type === 'passport') {
      setPassportApps(apps => 
        apps.map(app => 
          app.id === id 
            ? { ...app, status: newStatus as PassportApplication['status'] }
            : app
        )
      );
    } else {
      setVisaApps(apps => 
        apps.map(app => 
          app.id === id 
            ? { ...app, status: newStatus as VisaApplication['status'] }
            : app
        )
      );
    }
  };

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
      case 'PROCESSING': return <Clock size={16} />;
      case 'REJECTED': return <XCircle size={16} />;
      case 'CANCELLED': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>Application Management</h2>
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'passport' ? 'active' : ''}`}
            onClick={() => setActiveTab('passport')}
          >
            Passport Applications
          </button>
          <button
            className={`tab-btn ${activeTab === 'visa' ? 'active' : ''}`}
            onClick={() => setActiveTab('visa')}
          >
            Visa Applications
          </button>
        </div>
      </div>

      {activeTab === 'passport' && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Applicant Name</th>
                <th>Service Type</th>
                <th>Booklet Type</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passportApps.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.applicantName}</td>
                  <td>{app.serviceType}</td>
                  <td>{app.bookletType}</td>
                  <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value, 'passport')}
                        className="status-select"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <button className="btn-icon">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'visa' && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Applicant Name</th>
                <th>Country</th>
                <th>Visa Type</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visaApps.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.applicantName}</td>
                  <td>{app.country}</td>
                  <td>{app.visaType}</td>
                  <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value, 'visa')}
                        className="status-select"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                      <button className="btn-icon">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;