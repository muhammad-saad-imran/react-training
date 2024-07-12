import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import testApiSlice from "@/store/api/testApiSlice";
import businessInfoSlice from "@/store/feature/business-info";
import adaptiveApiSlice from "@/store/api/adaptiveApiSlice";
import policyCoverageSlice from "@/store/feature/policy-coverage";
import smartyStreetApiSlice from "@/store/api/smartyStreetApiSlice";

const rootReducer = combineReducers({
  policy: policyCoverageSlice.reducer,
  businessInfo: businessInfoSlice.reducer,
  [testApiSlice.reducerPath]: testApiSlice.reducer,
  [adaptiveApiSlice.reducerPath]: adaptiveApiSlice.reducer,
  [smartyStreetApiSlice.reducerPath]: smartyStreetApiSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        testApiSlice.middleware,
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
