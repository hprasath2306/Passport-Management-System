import type { ServiceType, BookletType, PassportApplication, VisaApplication } from '../types';

export const mockServiceTypes: ServiceType[] = [
  {
    id: 'ST001',
    name: 'Normal Service',
    description: 'Standard passport processing service',
    price: 1500,
    processingTime: '30 days',
    status: 'ACTIVE'
  },
  {
    id: 'ST002',
    name: 'Tatkal Service',
    description: 'Fast track passport processing',
    price: 3500,
    processingTime: '7 days',
    status: 'ACTIVE'
  },
  {
    id: 'ST003',
    name: 'Emergency Service',
    description: 'Emergency passport processing',
    price: 5000,
    processingTime: '3 days',
    status: 'ACTIVE'
  }
];

export const mockBookletTypes: BookletType[] = [
  {
    id: 'BT001',
    name: '36 Pages',
    pages: 36,
    validity: '10 years',
    price: 2000,
    status: 'ACTIVE'
  },
  {
    id: 'BT002',
    name: '60 Pages',
    pages: 60,
    validity: '10 years',
    price: 2500,
    status: 'ACTIVE'
  }
];

export const mockPassportApplications: PassportApplication[] = [
  {
    id: 'PA001',
    userId: 'USER-1001',
    applicantName: 'John Doe',
    serviceType: 'Normal Service',
    bookletType: '36 Pages',
    status: 'PROCESSING',
    applicationDate: '2024-01-15',
    expectedCompletionDate: '2024-02-15'
  }
];

export const mockVisaApplications: VisaApplication[] = [
  {
    id: 'VA001',
    userId: 'USER-1001',
    passportId: 'PP001',
    applicantName: 'John Doe',
    country: 'United States',
    visaType: 'Tourist',
    status: 'PENDING',
    applicationDate: '2024-01-20',
    expectedCompletionDate: '2024-02-20'
  }
];

export const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'UAE', 'Malaysia'
];

export const visaTypes = [
  'Tourist', 'Business', 'Student', 'Work', 'Transit'
];

export const occupationTypes = [
  'PRIVATE_EMPLOYEE', 'GOVERNMENT_EMPLOYEE', 'SELF_EMPLOYED', 'STUDENT', 'RETIRED_EMPLOYEE'
];

export const cities = [
  { id: 1, name: 'Mumbai' },
  { id: 2, name: 'Delhi' },
  { id: 3, name: 'Bangalore' },
  { id: 4, name: 'Chennai' },
  { id: 5, name: 'Kolkata' },
  { id: 6, name: 'Hyderabad' },
  { id: 7, name: 'Pune' },
  { id: 8, name: 'Ahmedabad' },
  { id: 9, name: 'Jaipur' },
  { id: 10, name: 'Lucknow' },
  { id: 11, name: 'Coimbatore' }
];