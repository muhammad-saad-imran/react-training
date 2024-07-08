export interface IBusinessDetails {
  businessType: string;
  businessName: string;
  contactName: string;
  email: string;
  alternateEmail: string;
  phone: string;
}

export interface IBusinessMailingAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface IBusinessRevenue {
  revenueFrom: number | undefined;
  revenueTo: number | undefined;
}
