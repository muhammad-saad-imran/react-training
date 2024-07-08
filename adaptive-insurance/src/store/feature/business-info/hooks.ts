import { RootState } from "@/store";

export const selectBusinessDetails = (state: RootState) => state.businessInfo.details;

export const selectBusinessMailingAddress = (state: RootState) =>
  state.businessInfo.mailingAddress;

export const selectBusinessRevenue = (state: RootState) => state.businessInfo.revenue;
