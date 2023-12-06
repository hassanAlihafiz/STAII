import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
  IBAccountDetails,
  Profile,
  UsersFinancialInfo,
  UsersFinancialInfoIB,
} from "@/types/auth"

interface UserState {
  profile: null | Profile
  financialInfo: null | UsersFinancialInfo
  onBoardingStep: number
  showLogout: boolean
  token: string | null
  ibAccount: null | IBAccountDetails
  financialInfoIB: null | UsersFinancialInfoIB
  showPassword: boolean
  showMfa: boolean
  bankAccount: null
}

const initialState: UserState = {
  profile: null,
  financialInfo: null,
  onBoardingStep: 1,
  showLogout: false,
  ibAccount: null,
  token: null,
  financialInfoIB: null,
  showPassword: false,
  showMfa: false,
  bankAccount: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      } else {
        state.profile = action.payload as Profile
      }
    },
    setIBAccount: (state, action: PayloadAction<IBAccountDetails>) => {
      state.ibAccount = action.payload
    },
    setFinancialInfo: (
      state,
      action: PayloadAction<{
        value: UsersFinancialInfo
        text: UsersFinancialInfoIB
      }>
    ) => {
      if (state.financialInfo) {
        state.financialInfo = {
          ...state.financialInfo,
          ...action.payload.value,
        }
      } else {
        state.financialInfo = { ...action.payload.value }
      }
      if (state.financialInfoIB) {
        state.financialInfoIB = {
          ...state.financialInfoIB,
          ...action.payload.text,
        }
      } else {
        state.financialInfoIB = { ...action.payload.text }
      }
    },

    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onBoardingStep = action.payload
    },
    setShowLogout: (state, action: PayloadAction<boolean>) => {
      state.showLogout = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setShowMfa: (state, action: PayloadAction<boolean>) => {
      state.showMfa = action.payload
    },
    showPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload
    },
    resetUserDetails(state) {
      return initialState
    },
  },
})

export const {
  setUser,
  setFinancialInfo,

  setOnboardingStep,
  resetUserDetails,
  showPassword,
  setToken,
  setShowMfa,
  setIBAccount,
  setShowLogout,
} = userSlice.actions
export default userSlice.reducer
