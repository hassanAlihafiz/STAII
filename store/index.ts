"use client"

import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage/session"

import appSlice from "./slices/app-slice"
import bankSlice from "./slices/bank-slice"
import newsSlice, { fetchNewsCategory } from "./slices/news-slice"
import userSlice from "./slices/user-slice"
import apiSlice from "./slices/api-slice"
import communitySlice from "./slices/community-slice"
import stocksSlice from "./slices/stocks-slice"

const rootReducer = combineReducers({
  user: userSlice,
  bank: bankSlice,
  app: appSlice,
  news: newsSlice,
  api: apiSlice,
  community: communitySlice,
  stocks: stocksSlice,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.dispatch(fetchNewsCategory(["stocks", "business", "crypto", "economy"]))

export default store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
