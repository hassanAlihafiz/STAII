import { callGetApi } from "@/utils/api"
import { newsBackgroundColors, tagBackgroundColors } from "@/utils/news"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { NewsFeed } from "@/types/news"

interface NewsCategoryState {
  data: NewsFeed[] | null
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: Record<string, NewsCategoryState> = {
  stocks: { data: null, loading: "idle", error: null },
  business: { data: null, loading: "idle", error: null },
  crypto: { data: null, loading: "idle", error: null },
  economy: { data: null, loading: "idle", error: null },
}

export const fetchNewsCategory = createAsyncThunk(
  "newsCategory/fetchNewsCategory",
  async (categories: string[], { dispatch }) => {
    for (const category of categories) {
      dispatch(newsSlice.actions.setPending(category))
      await callGetApi(
        "default",
        `/news/${category}?count=10`,

        (e) => {
          const list = mergeBgColors(
            e?.data,
            newsBackgroundColors,
            tagBackgroundColors
          )
          dispatch(newsSlice.actions.setFulfilled({ category, data: list }))
        },
        (error) => {
          dispatch(
            newsSlice.actions.setRejected({
              category,
              error: "An error occurred",
            })
          )
        }
      )
    }
  }
)

const newsSlice = createSlice({
  name: "newsCategory",
  initialState,
  reducers: {
    setPending: (state, action: PayloadAction<string>) => {
      state[action.payload].loading = "pending"
      state[action.payload].error = null
    },
    setFulfilled: (
      state,
      action: PayloadAction<{ category: string; data: NewsFeed[] }>
    ) => {
      const { category, data } = action.payload
      state[category].loading = "succeeded"
      state[category].data = data
      state[category].error = null
    },
    setRejected: (
      state,
      action: PayloadAction<{ category: string; error: string }>
    ) => {
      const { category, error } = action.payload
      state[category].loading = "failed"
      state[category].error = error || "An error occurred"
    },
  },
})

export default newsSlice.reducer
export const { setFulfilled } = newsSlice.actions
export const mergeBgColors = (
  newsArray: NewsFeed[],
  backgroundColors: string[],
  tagBackgroundColors: string[]
) => {
  const mergedNewsArray = []

  for (let i = 0; i < newsArray.length; i++) {
    const newsArticle = newsArray[i]
    const bgColor = backgroundColors[i % backgroundColors.length]
    const tagBgColor = tagBackgroundColors[i % tagBackgroundColors.length]
    const mergedNews = {
      ...newsArticle,
      bgColor: bgColor,
      tagBgColor: tagBgColor,
    }
    mergedNewsArray.push(mergedNews)
  }

  return mergedNewsArray
}
