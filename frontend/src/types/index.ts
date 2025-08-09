export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  registrationType: string;
  role: 'ADMIN' | 'USER';
  passportId?: string;
  visaId?: string;
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

export interface LoginData {
  customerIdOrPhone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  role: 'ADMIN' | 'USER';
}

export interface RegisterResponse {
  user: User;
  customerId?: string;
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  processingTime: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BookletType {
  id: string;
  name: string;
  pages: number;
  validity: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BackendPassportApplication {
  passportApplicationId: number;
  userId: string;
  passportId: string;
  serviceTypeId: number;
  bookletTypeId: number;
  passportType: 'NEW' | 'RENEWAL';
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'PENDING' | 'ISSUED' | 'CANCELLED';
  amountPaid: number;
  previousPassportId?: string;
  processingDays?: number;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userCitizenType: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackendVisaApplication {
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
  createdAt: string;
  updatedAt: string;
}