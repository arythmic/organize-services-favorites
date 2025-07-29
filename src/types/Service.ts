export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  limitations: string;
  loginUrl: string;
  pricingUrl?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceFormData {
  name: string;
  category: string;
  description: string;
  limitations: string;
  loginUrl: string;
  pricingUrl?: string;
}

export const CATEGORIES = [
  'Cloud Storage',
  'Development Tools',
  'Design',
  'Communication',
  'Productivity',
  'Analytics',
  'Email Marketing',
  'Social Media',
  'Learning',
  'Other'
] as const;

export type Category = typeof CATEGORIES[number];