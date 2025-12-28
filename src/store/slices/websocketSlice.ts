import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PriceUpdate } from "@/types";

interface WebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  lastMessage: PriceUpdate | null;
  error: string | null;
  reconnectAttempts: number;
}

const initialState: WebSocketState = {
  isConnected: false,
  isConnecting: false,
  lastMessage: null,
  error: null,
  reconnectAttempts: 0,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (action.payload) {
        state.error = null;
        state.reconnectAttempts = 0;
      }
    },
    messageReceived: (state, action: PayloadAction<PriceUpdate>) => {
      state.lastMessage = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    incrementReconnectAttempts: (state) => {
      state.reconnectAttempts += 1;
    },
    resetReconnectAttempts: (state) => {
      state.reconnectAttempts = 0;
    },
  },
});

export const {
  setConnecting,
  setConnected,
  messageReceived,
  setError,
  incrementReconnectAttempts,
  resetReconnectAttempts,
} = websocketSlice.actions;

export default websocketSlice.reducer;

