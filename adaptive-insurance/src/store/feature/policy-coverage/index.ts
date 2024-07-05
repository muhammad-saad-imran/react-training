import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PolicyCoverageState {
  hours: number;
  limit: number;
}

const initialState = {
  hours: 12,
  limit: 15000,
} satisfies PolicyCoverageState as PolicyCoverageState;

const policyCoverageSlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    changeCoverageHours(state, action: PayloadAction<number>) {
      state.hours = action.payload;
    },
    changeCoverageLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { changeCoverageHours, changeCoverageLimit } =
  policyCoverageSlice.actions;
export default policyCoverageSlice.reducer;

export const selectPolicyCoverage = (state: RootState) => state.policy;
