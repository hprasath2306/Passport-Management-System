import { Eye } from 'lucide-react';

export const PassportList = ({ 
  passportApps, 
  formatDate, 
  getStatusColor, 
  getStatusIcon, 
  handlePassportStatusChange,
  onViewDetails 
}: any) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Passport ID</th>
            <th>Applicant Name</th>
            <th>Passport Type</th>
            <th>Application Date</th>
            <th>Amount Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passportApps.map((app: any) => (
            <tr key={app.passportApplicationId}>
              <td>{app.passportApplicationId}</td>
              <td>{app.passportId}</td>
              <td>{`${app.userFirstName} ${app.userLastName}`}</td>
              <td>{app.passportType}</td>
              <td>{formatDate(app.applicationDate)}</td>
              <td>₹{app.amountPaid}</td>
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
                    onChange={(e) => handlePassportStatusChange(
                      app.passportApplicationId, 
                      e.target.value
                    )}
                    className="status-select"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ISSUED">Issued</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <button 
                    className="btn-icon"
                    title="View Details"
                    onClick={() => onViewDetails(app)}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {passportApps.length === 0 && (
        <div className="no-data">No passport applications found</div>
      )}
    </div>
  )
}