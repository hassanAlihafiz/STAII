import { createSlice } from "@reduxjs/toolkit"

import { CommunityData } from "@/types/community"

interface initialStateType {
  communityData: null | CommunityData[]
}
const initialState: initialStateType = {
  communityData: null,
}

const communitySlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setCommunityData(state, action) {
      state.communityData = action.payload
    },
  },
})

export const { setCommunityData } = communitySlice.actions

export default communitySlice.reducer
