import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./slices/tokensSlice";
import uiReducer from "./slices/uiSlice";
import websocketReducer from "./slices/websocketSlice";

/**
 * Redux store configuration
 * Centralized state management for tokens, UI state, and WebSocket connection
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokensReducer,
      ui: uiReducer,
      websocket: websocketReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for WebSocket messages
          ignoredActions: ["websocket/messageReceived"],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

