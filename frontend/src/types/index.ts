export interface User {
    userId: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    age: number;
    address: string;
    pincode: string;
    city: string;
    state: string;
    role: 'ADMIN' | 'USER';
    citizenType: 'INFANT' | 'CHILDREN' | 'TEEN' | 'ADULT' | 'SENIOR_CITIZEN';
    occupation: string;
    registrationType: string;
    createdAt: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
  role: 'ADMIN' | 'USER';
}

export interface LoginData {
  customerIdOrPhone: string;
  password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    occupation: string;
    registrationType: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<User | void | null>;
  logout: () => void;
  isAdmin: () => boolean;
}

export interface PassportDetails {
  passportApplicationId: number;
  userId: string;
  passportId: string;
  serviceTypeId: number;
  bookletTypeId: number;
  passportType: "NEW" | "RENEWAL";
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: "PENDING" | "ISSUED" | "CANCELLED";
  amountPaid: number;
  previousPassportId?: string;
  processingDays?: number;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userCitizenType: string;
  cancellationComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminVisaApplication {
  visaApplicationId: number;
  userId: string;
  visaId: string;
  passportId: string;
  destinationCountry: string;
  visaType: string;
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'PENDING' | 'ISSUED' | 'CANCELLED';
  amountPaid: number;
  validityYears: number;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userOccupation: string;
  cancellationComment?: string;
  createdAt: string;
  updatedAt: string;
}