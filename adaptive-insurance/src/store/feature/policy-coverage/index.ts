import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { IQuoteEstimate } from "@/store/api/types";

export interface IPolicyCoverageState {
  quoteEstimates: IQuoteEstimate[];
  selectedEstimateId: string;
  amount: number;
}

const initialState = {
  quoteEstimates: [],
  selectedEstimateId: "",
  amount: 10000,
} satisfies IPolicyCoverageState as IPolicyCoverageState;

const policyCoverageSlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    changeCoveragePolicy(state, action: PayloadAction<IPolicyCoverageState>) {
      state.quoteEstimates = action.payload.quoteEstimates;
      state.selectedEstimateId = action.payload.selectedEstimateId;
      state.amount = action.payload.amount;
    },
    changeQuoteEstimates(state, action: PayloadAction<IQuoteEstimate[]>) {
      state.quoteEstimates = action.payload;
    },
    changeCoverageAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
    },
    changeSelectedQuoteId(state, action: PayloadAction<string>) {
      state.selectedEstimateId = action.payload;
    },
  },
});

export const {
  changeCoveragePolicy,
  changeCoverageAmount,
  changeQuoteEstimates,
  changeSelectedQuoteId,
} = policyCoverageSlice.actions;

export default policyCoverageSlice;

export const selectPolicyCoverage = (state: RootState) => state.policy;
