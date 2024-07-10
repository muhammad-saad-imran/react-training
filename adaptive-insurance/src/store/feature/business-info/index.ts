import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  IBusinessDetails,
  IBusinessMailingAddress,
  IBusinessRevenue,
} from "@/store/feature/business-info/types";

interface BusinessInfoState {
  zipCode: string;
  details: IBusinessDetails;
  mailingAddress: IBusinessMailingAddress;
  revenue: IBusinessRevenue;
}

const initialState = {
  zipCode: "",
  details: {
    businessType: "",
    businessName: "",
    contactName: "",
    email: "",
    alternateEmail: "",
    phone: "",
  },
  mailingAddress: {
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
  revenue: {
    revenueFrom: undefined,
    revenueTo: undefined,
  },
} satisfies BusinessInfoState as BusinessInfoState;

const businessInfoSlice = createSlice({
  name: "business-info",
  initialState,
  reducers: {
    setBusinessZipCode(state, action: PayloadAction<string>) {
      state.zipCode = action.payload;
    },
    setBusinessDetails(state, action: PayloadAction<IBusinessDetails>) {
      state.details = action.payload;
    },
    setBusinessMailingAddress(
      state,
      action: PayloadAction<IBusinessMailingAddress>
    ) {
      state.mailingAddress = action.payload;
    },
    setBusinessRevenue(state, action: PayloadAction<IBusinessRevenue>) {
      state.revenue = action.payload;
    },
  },
});

export const {
  setBusinessDetails,
  setBusinessMailingAddress,
  setBusinessRevenue,
  setBusinessZipCode
} = businessInfoSlice.actions;

export default businessInfoSlice;

export const selectBusinessZipCode = (state: RootState) =>
  state.businessInfo.zipCode;

export const selectBusinessDetails = (state: RootState) =>
  state.businessInfo.details;

export const selectBusinessMailingAddress = (state: RootState) =>
  state.businessInfo.mailingAddress;

export const selectBusinessRevenue = (state: RootState) =>
  state.businessInfo.revenue;
