import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  IBusinessDetails,
  IBusinessMailingAddress,
  IBusinessRevenue,
} from "@/store/feature/business-info/types";

interface BusinessInfoState {
  details: IBusinessDetails;
  mailingAddress: IBusinessMailingAddress;
  revenue: IBusinessRevenue;
}

const initialState = {
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
} = businessInfoSlice.actions;

export default businessInfoSlice;

export const selectBusinessDetails = (state: RootState) =>
  state.businessInfo.details;

export const selectBusinessMailingAddress = (state: RootState) =>
  state.businessInfo.mailingAddress;

export const selectBusinessRevenue = (state: RootState) =>
  state.businessInfo.revenue;
