import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { BankDetails } from "@/types/user"

interface BankState {
  userGuid: string | null
  memberGuid: string | null
  accounts: null | BankDetails[]
}

const initialState: BankState = {
  userGuid: null,
  memberGuid: null,
  accounts: null,
}

const bankSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGuids: (
      state,
      action: PayloadAction<{ userGuid: string; memberGuid: string }>
    ) => {
      state.userGuid = action.payload.userGuid
      state.memberGuid = action.payload.memberGuid
    },
    setBankAccounts: (state, action: PayloadAction<BankDetails[]>) => {
      state.accounts = action.payload
    },
    addBankAccounts: (state, action: PayloadAction<BankDetails>) => {
      if (state.accounts) {
        state.accounts = [...state.accounts, action.payload]
      } else {
        state.accounts = [action.payload]
      }
    },
    resetBankDetails: (state) => initialState,
  },
})

export const { setGuids, setBankAccounts, addBankAccounts,resetBankDetails } = bankSlice.actions
export default bankSlice.reducer
