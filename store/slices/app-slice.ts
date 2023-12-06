import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface state {
  showMfaEnrollment: "must" | "optional" | false | null
  showMfaChallenge: "must" | "optional" | false | null
  mfaFactorId: null | string
  showRedirectModal: boolean
}

const initialState: state = {
  showMfaEnrollment: null,
  showMfaChallenge: null,
  mfaFactorId: null,
  showRedirectModal: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggelMfaEnrollment: (
      state,
      action: PayloadAction<state["showMfaEnrollment"]>
    ) => {
      state.showMfaEnrollment = action.payload
    },
    toggelMfaChallenge: (
      state,
      action: PayloadAction<state["showMfaChallenge"]>
    ) => {
      state.showMfaChallenge = action.payload
    },
    setMfaFactorId: (state, action: PayloadAction<string>) => {
      state.mfaFactorId = action.payload
    },
    toggleRedirectModal: (state, action: PayloadAction<boolean>) => {
      state.showRedirectModal = action.payload
    },
    resetApp: () => initialState,
  },
})

export const {
  toggelMfaEnrollment,
  toggelMfaChallenge,
  setMfaFactorId,
  resetApp,
  toggleRedirectModal,
} = appSlice.actions
export default appSlice.reducer
