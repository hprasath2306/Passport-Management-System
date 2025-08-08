  import {
  FileText as Passport,
  Globe,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
  
  export const getPassportStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "PENDING":
        return "status-pending";
      case "PROCESSING":
        return "status-processing";
      case "REJECTED":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  export const getPassportStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle size={16} />;
      case "PENDING":
        return <Clock size={16} />;
      case "PROCESSING":
        return <AlertCircle size={16} />;
      case "REJECTED":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  export const getVisaStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "PENDING":
        return "status-pending";
      case "PROCESSING":
        return "status-processing";
      case "REJECTED":
        return "status-rejected";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  export const getVisaStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle size={16} />;
      case "PENDING":
        return <Clock size={16} />;
      case "PROCESSING":
        return <AlertCircle size={16} />;
      case "REJECTED":
        return <XCircle size={16} />;
      case "CANCELLED":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };