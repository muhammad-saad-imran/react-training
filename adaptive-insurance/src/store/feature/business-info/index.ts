import {
  IBusinessDetails,
  IBusinessMailingAddress,
  IBusinessRevenue,
} from "@/store/feature/business-info/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
