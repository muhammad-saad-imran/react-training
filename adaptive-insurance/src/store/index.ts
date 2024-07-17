import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import businessInfoSlice from "@/store/feature/business-info";
import adaptiveApiSlice from "@/store/api/adaptiveApiSlice";
import policyCoverageSlice from "@/store/feature/policy-coverage";
import smartyStreetApiSlice from "@/store/api/smartyStreetApiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      policy: policyCoverageSlice.reducer,
      businessInfo: businessInfoSlice.reducer,
      [adaptiveApiSlice.reducerPath]: adaptiveApiSlice.reducer,
      [smartyStreetApiSlice.reducerPath]: smartyStreetApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        adaptiveApiSlice.middleware,
        smartyStreetApiSlice.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
