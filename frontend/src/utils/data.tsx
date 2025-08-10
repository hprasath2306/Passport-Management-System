import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ISSUED":
      return "status-approved";
    case "PENDING":
      return "status-pending";
    case "PROCESSING":
      return "status-processing";
    case "REJECTED":
      return "status-rejected";
    case "CANCELLED":
      return "status-cancelled";
    case "EXPIRED":
      return "status-expired";
    default:
      return "status-pending";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "ISSUED":
      return <CheckCircle size={16} />;
    case "PENDING":
      return <Clock size={16} />;
    case "PROCESSING":
      return <AlertCircle size={16} />;
    case "REJECTED":
      return <XCircle size={16} />;
    case "EXPIRED":
      return <AlertTriangle size={16} />;
    case "CANCELLED":
      return <XCircle size={16} />;
    default:
      return <Clock size={16} />;
  }
};

export const isPassportExpired = (expiryDate: string | null): boolean => {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
};

export const getEffectivePassportStatus = (status: string, expiryDate: string | null): string => {
  if (status === "ISSUED" && isPassportExpired(expiryDate)) {
    return "EXPIRED";
  }
  return status;
};


export const occupationTypes = [
  'PRIVATE_EMPLOYEE', 'GOVERNMENT_EMPLOYEE', 'SELF_EMPLOYED', 'STUDENT', 'RETIRED_EMPLOYEE'
];

export const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'UAE', 'Malaysia'
];

export const visaTypes = [
  'Tourist', 'Business', 'Student', 'Work', 'Transit'
];