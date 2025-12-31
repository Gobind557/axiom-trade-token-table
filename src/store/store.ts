import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./slices/tokensSlice";
import uiReducer from "./slices/uiSlice";

/**
 * Redux store configuration
 * Centralized state management for tokens and UI state
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokensReducer,
      ui: uiReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

