import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import policyCoverageSlice from "./feature/policy-coverage";
import testApiSlice from "@/store/api/testApiSlice";
import businessInfoSlice from "@/store/feature/business-info";

const rootReducer = combineReducers({
  policy: policyCoverageSlice.reducer,
  businessInfo: businessInfoSlice.reducer,
  [testApiSlice.reducerPath]: testApiSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(testApiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
