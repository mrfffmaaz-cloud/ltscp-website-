export type Language = 'en' | 'hi';
export type ThemeMode = 'light' | 'dark';

export interface SiteSettings {
  businessName: string;
  fullName: string;
  tagline: string;
  address: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  hours: string;
  heroTitle: string;
  heroSubtitle: string;
  announcementText: string;
  announcementActive: boolean;
  finoMerchantConfigured: boolean;
  bbpsConfigured: boolean;
  irctcAuthorized: boolean;
  updatedAt?: unknown;
}

export interface Category {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  iconName: string;
  order: number;
  isActive: boolean;
  updatedAt?: unknown;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  nameEn: string;
  nameHi: string;
  shortDescEn: string;
  shortDescHi: string;
  fullDescEn: string;
  fullDescHi: string;
  iconName: string;
  charge: string;
  processingTime: string;
  requiredDocuments: string[];
  serviceInfo: string[];
  whatsappTemplate: string;
  whatsappFields: string[];
  isPopular: boolean;
  isActive: boolean;
  isRegulated: boolean;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Processing' | 'Completed' | 'Cancelled';

export interface Enquiry {
  id: string;
  customerName: string;
  mobileNumber: string;
  serviceId: string;
  serviceName: string;
  message: string;
  status: EnquiryStatus;
  adminRemarks: string;
  source: 'website_form';
  createdAt: unknown;
  updatedAt: unknown;
}

export interface StaffAccount {
  email: string;
  displayName: string;
  role: 'admin' | 'staff';
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AnalyticsEvent {
  id: string;
  eventType: 'page_view' | 'service_view' | 'whatsapp_intent' | 'search';
  path: string;
  serviceId: string;
  queryText: string;
  createdAt: unknown;
}
