import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  IBusinessAddress,
  IBusinessDetails,
  IBusinessInfoState,
  IBusinessRevenue,
} from "@/store/feature/business-info/types";

const initialState = {
  businessType: "",
  businessName: "",
  contactName: "",
  email: "",
  alternateEmail: "",
  phone: "",
  revenueRangeFrom: undefined,
  revenueRangeTo: undefined,
  mailingAddress: {
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
  billingAddress: {
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
} satisfies IBusinessInfoState as IBusinessInfoState;

const businessInfoSlice = createSlice({
  name: "business-info",
  initialState,
  reducers: {
    setBusinessDetails(state, action: PayloadAction<IBusinessDetails>) {
      state = {
        ...state,
        businessType: action.payload.businessType,
        businessName: action.payload.businessName,
        contactName: action.payload.contactName,
        email: action.payload.email,
        alternateEmail: action.payload.alternateEmail,
        phone: action.payload.phone,
      };
    },
    setBusinessMailingAddress(state, action: PayloadAction<IBusinessAddress>) {
      state.mailingAddress = action.payload;
    },
    setBusinessBillingAddress(state, action: PayloadAction<IBusinessAddress>) {
      state.billingAddress = action.payload;
    },
    setBusinessRevenue(state, action: PayloadAction<IBusinessRevenue>) {
      state = {
        ...state,
        revenueRangeFrom: action.payload.revenueRangeFrom,
        revenueRangeTo: action.payload.revenueRangeTo,
      };
    },
  },
});

export const {
  setBusinessDetails,
  setBusinessMailingAddress,
  setBusinessBillingAddress,
  setBusinessRevenue,
} = businessInfoSlice.actions;

export default businessInfoSlice;

export const selectBusinessDetails = (state: RootState) => state.businessInfo;

export const selectBusinessMailingAddress = (state: RootState) =>
  state.businessInfo.mailingAddress;

export const selectBusinessBillingAddress = (state: RootState) =>
  state.businessInfo.billingAddress;

export const selectBusinessRevenue = (state: RootState) => ({
  revenueRangeFrom: state.businessInfo.revenueRangeFrom,
  revenueRangeTo: state.businessInfo.revenueRangeTo,
});
