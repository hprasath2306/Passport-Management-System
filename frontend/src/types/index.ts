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

export interface PassportApplication {
  id: string;
  userId: string;
  applicantName: string;
  serviceType: string;
  bookletType: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING';
  applicationDate: string;
  expectedCompletionDate: string;
}

export interface VisaApplication {
  id: string;
  userId: string;
  passportId: string;
  applicantName: string;
  country: string;
  visaType: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  applicationDate: string;
  expectedCompletionDate: string;
}