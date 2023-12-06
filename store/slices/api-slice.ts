// apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errorMessage: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiStarted(state) {
      state.isLoading = true;
      state.errorMessage = null;
    },
    apiDone(state) {
      state.isLoading = false;
    },
    apiFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  apiStarted,
  apiDone,
  apiFailed,
  clearErrorMessage,
} = apiSlice.actions;

export default apiSlice.reducer;
