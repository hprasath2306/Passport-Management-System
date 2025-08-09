import "./Overviewgrid.css";
import { FileText, Users, BarChart3 } from 'lucide-react';


export const Overviewgrid = ({ stats }: { stats: any }) => {
  return (
    <div className="overview-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <FileText size={24} />
        </div>
        <div className="stat-content">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats.totalApplications}</p>
          <p className="stat-detail">
            {stats.totalPassportApplications} Passport,{" "}
            {stats.totalVisaApplications} Visa
          </p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon pending">
          <Users size={24} />
        </div>
        <div className="stat-content">
          <h3>Pending Review</h3>
          <p className="stat-number">{stats.pendingApplications}</p>
          <p className="stat-detail">Awaiting processing</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon approved">
          <BarChart3 size={24} />
        </div>
        <div className="stat-content">
          <h3>Issued</h3>
          <p className="stat-number">{stats.approvedApplications}</p>
          <p className="stat-detail">Successfully approved</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon cancelled">
          <Users size={24} />
        </div>
        <div className="stat-content">
          <h3>Cancelled</h3>
          <p className="stat-number">{stats.cancelledApplications}</p>
          <p className="stat-detail">Applications cancelled</p>
        </div>
      </div>
    </div>
  );
};
