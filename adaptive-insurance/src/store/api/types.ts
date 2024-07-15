export interface IAddress {
  street: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ICoverage {
  coverageAmount: number;
  estimateId: string;
  effectiveDate: string;
}

export interface IBusinessInformation {
  businessType: string;
  businessName: string;
  contactName: string;
  mailingAddress: IAddress;
  billingAddress: IAddress;
  phone: string;
  email: string;
  alternativeEmail: string;
  revenueRangeFrom: number;
  revenueRangeTo: number;
}

export interface ICreateQuoteParams {
  step: "address" | "coverage" | "businessInformation" | "checkout";
  quoteId?: string;
  product: string;
  address: IAddress;
  coverage?: ICoverage;
  businessInformation?: IBusinessInformation;
  checkout?: {};
}

export interface IAddressCoordinates {
  latitude: string;
  longitude: string;
}

export interface ISections {
  address: boolean;
  coverage: boolean;
  businessInformation: boolean;
  checkout: boolean;
}

export interface IMetadata {
  visited_sections: ISections;
  completed_sections: ISections;
}

export interface IQuoteEstimate {
  type: string;
  duration: number;
  productId: string;
  countyFips: string;
  netRateOnline: number;
  premiumAmount: number;
  coverageAmount: number;
}

export interface IAscendData {
  programId: string;
  programUrl: string;
  billableId: string;
}

export interface IData {
  address: IAddressCoordinates;
  metadata: IMetadata;
  quoteEstimates: IQuoteEstimate[];
  selectedEstimateId: string;
  productRaterVersion: string;
  ascend: IAscendData;
}

export interface IMigration {
  completed_sections: boolean;
}

export interface IMetaData {
  migration: IMigration;
}

export interface IDocument {
  key: string;
  fileName: string;
  createdAt: string;
  documentUrl: string;
}

export interface IDocuments {
  quote: IDocument[];
}

export interface IAscendDetails {
  ascendId: string;
  ascendContactId: string;
}

export interface IInsured {
  id: string;
  businessName: string;
  businessType: string;
  contactName: string;
  mailingAddress: IAddress;
  billingAddress: IAddress;
  phone: string;
  email: string;
  alternativeEmail: string;
  revenueRangeFrom: number;
  revenueRangeTo: number;
  data: {
    ascend: IAscendDetails;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IAgent {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  agencyName: string;
  status: string;
  agencyId: string;
  data: {
    ascend: IAscendDetails;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IQuote {
  id: string;
  data: IData;
  metaData: IMetaData;
  street: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  product: string;
  countyFips: string;
  insuredId: string;
  agentId: string;
  agentEmail: string;
  carrier: string;
  effectiveDate: string;
  effectiveDateUtc: string;
  quoteDate: string;
  quoteDateUtc: string;
  addressId: string;
  boundDate: string;
  boundDateUtc: string;
  documents: IDocuments;
  ascendProgramId: string;
  bound: boolean;
  quoteNumberInc: number;
  quoteNumber: string;
  policyId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  agent_id: string;
  insured: IInsured;
  agent: IAgent;
  address: string;
  policy: string;
}
