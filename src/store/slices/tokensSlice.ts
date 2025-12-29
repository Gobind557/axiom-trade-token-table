import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Token, TokenStatus, SortOption, SortDirection } from "@/types";

interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  sortBy: Record<TokenStatus, SortOption | null>;
  sortDirection: Record<TokenStatus, SortDirection>;
  filters: Record<TokenStatus, string>;
}

const initialState: TokensState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  sortBy: {
    new: null,
    "final-stretch": null,
    migrated: null,
  },
  sortDirection: {
    new: "desc",
    "final-stretch": "desc",
    migrated: "desc",
  },
  filters: {
    new: "",
    "final-stretch": "",
    migrated: "",
  },
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ status: TokenStatus; tokens: Token[] }>
    ) => {
      const { status, tokens } = action.payload;
      if (status === "new") {
        state.newPairs = tokens;
      } else if (status === "final-stretch") {
        state.finalStretch = tokens;
      } else if (status === "migrated") {
        state.migrated = tokens;
      }
    },
    updateToken: (
      state,
      action: PayloadAction<{ status: TokenStatus; token: Token }>
    ) => {
      const { status, token } = action.payload;
      const tokens =
        status === "new"
          ? state.newPairs
          : status === "final-stretch"
            ? state.finalStretch
            : state.migrated;

      const index = tokens.findIndex((t) => t.id === token.id);
      if (index !== -1) {
        tokens[index] = token;
      }
    },
    setSortBy: (
      state,
      action: PayloadAction<{
        status: TokenStatus;
        sortBy: SortOption | null;
      }>
    ) => {
      const { status, sortBy } = action.payload;
      state.sortBy[status] = sortBy;
    },
    setSortDirection: (
      state,
      action: PayloadAction<{
        status: TokenStatus;
        direction: SortDirection;
      }>
    ) => {
      const { status, direction } = action.payload;
      state.sortDirection[status] = direction;
    },
    setFilter: (
      state,
      action: PayloadAction<{ status: TokenStatus; filter: string }>
    ) => {
      const { status, filter } = action.payload;
      state.filters[status] = filter;
    },
  },
});

export const {
  setTokens,
  updateToken,
  setSortBy,
  setSortDirection,
  setFilter,
} = tokensSlice.actions;

export default tokensSlice.reducer;
