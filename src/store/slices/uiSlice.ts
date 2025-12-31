import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedTokenId: string | null;
  isModalOpen: boolean;
  activePopoverId: string | null;
  popupPosition: { top: number; left: number } | null;
  isImagePopupOpen: boolean;
  imagePopupUrl: string | null;
  imagePopupPosition: { top: number; left: number } | null;
}

const initialState: UIState = {
  selectedTokenId: null,
  isModalOpen: false,
  activePopoverId: null,
  popupPosition: null,
  isImagePopupOpen: false,
  imagePopupUrl: null,
  imagePopupPosition: null,
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
    setPopupPosition: (state, action: PayloadAction<{ top: number; left: number } | null>) => {
      state.popupPosition = action.payload;
    },
    setImagePopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isImagePopupOpen = action.payload;
    },
    setImagePopupUrl: (state, action: PayloadAction<string | null>) => {
      state.imagePopupUrl = action.payload;
    },
    setImagePopupPosition: (state, action: PayloadAction<{ top: number; left: number } | null>) => {
      state.imagePopupPosition = action.payload;
    },
  },
});

export const {
  setSelectedToken,
  setModalOpen,
  setActivePopover,
  setPopupPosition,
  setImagePopupOpen,
  setImagePopupUrl,
  setImagePopupPosition,
} = uiSlice.actions;

export default uiSlice.reducer;

