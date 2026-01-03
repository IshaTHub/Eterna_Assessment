import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenColumn, SortConfig } from "../types";

interface TokenState {
  columns: Record<TokenColumn, Token[]>;
  sortConfig: Record<TokenColumn, SortConfig>;
  selectedToken: Token | null;
}

const initialState: TokenState = {
  columns: {
    newPairs: [],
    finalStretch: [],
    migrated: [],
  },
  sortConfig: {
    newPairs: { field: "time", direction: "desc" },
    finalStretch: { field: "time", direction: "desc" },
    migrated: { field: "time", direction: "desc" },
  },
  selectedToken: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ column: TokenColumn; tokens: Token[] }>
    ) => {
      state.columns[action.payload.column] = action.payload.tokens;
    },
    updateToken: (
      state,
      action: PayloadAction<{
        column: TokenColumn;
        token: Partial<Token> & { id: string };
      }>
    ) => {
      const index = state.columns[action.payload.column].findIndex(
        (t) => t.id === action.payload.token.id
      );
      if (index !== -1) {
        state.columns[action.payload.column][index] = {
          ...state.columns[action.payload.column][index],
          ...action.payload.token,
        };
      }
    },
    setSortConfig: (
      state,
      action: PayloadAction<{ column: TokenColumn; config: SortConfig }>
    ) => {
      state.sortConfig[action.payload.column] = action.payload.config;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    reorderTokens: (state, action: PayloadAction<{ column: TokenColumn }>) => {
      const tokens = [...state.columns[action.payload.column]];
      // Fisher-Yates shuffle algorithm
      for (let i = tokens.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
      }
      state.columns[action.payload.column] = tokens;
    },
  },
});

export const {
  setTokens,
  updateToken,
  setSortConfig,
  setSelectedToken,
  reorderTokens,
} = tokenSlice.actions;
export default tokenSlice.reducer;
