import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedTokenId: string | null;
  isModalOpen: boolean;
  activePopoverId: string | null;
  sidebarOpen: boolean;
  theme: "dark" | "light";
}

const initialState: UIState = {
  selectedTokenId: null,
  isModalOpen: false,
  activePopoverId: null,
  sidebarOpen: false,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setActivePopover: (state, action: PayloadAction<string | null>) => {
      state.activePopoverId = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setSelectedToken,
  setModalOpen,
  setActivePopover,
  setSidebarOpen,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;

