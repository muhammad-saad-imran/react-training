export interface IBusinessInfoState {
  businessType: string;
  businessName: string;
  contactName: string;
  email: string;
  alternateEmail: string;
  phone: string;
  revenueRangeFrom: number | undefined;
  revenueRangeTo: number | undefined;
  mailingAddress: IBusinessAddress;
  billingAddress: IBusinessAddress;
}

export interface IBusinessDetails {
  businessType: string;
  businessName: string;
  contactName: string;
  email: string;
  alternateEmail: string;
  phone: string;
}

export interface IBusinessAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface IBusinessRevenue {
  revenueRangeFrom: number | undefined;
  revenueRangeTo: number | undefined;
}
