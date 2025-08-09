import { Eye } from "lucide-react"

export const VisaList = ({ 
  visaApps, 
  formatDate, 
  getStatusColor, 
  getStatusIcon, 
  handleVisaStatusChange,
  onViewDetails 
}: any) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Visa ID</th>
            <th>Applicant Name</th>
            <th>Country</th>
            <th>Visa Type</th>
            <th>Application Date</th>
            <th>Amount Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visaApps.map((app: any) => (
            <tr key={app.visaApplicationId}>
              <td>{app.visaApplicationId}</td>
              <td>{app.visaId}</td>
              <td>{`${app.userFirstName} ${app.userLastName}`}</td>
              <td>{app.destinationCountry}</td>
              <td>{app.visaType}</td>
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
                    onChange={(e) => handleVisaStatusChange(
                      app.visaId, 
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
      {visaApps.length === 0 && (
        <div className="no-data">No visa applications found</div>
      )}
    </div>
  )
}