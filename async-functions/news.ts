import { callGetApi } from "@/utils/api"
import { newsBackgroundColors, tagBackgroundColors } from "@/utils/news"

import { NewsCategories, NewsFeed } from "@/types/news"

export const getNews = async (category: NewsCategories) => {
  try {
    let list:any = []
  await callGetApi(
      "default",
      `/news/${category}?count=10`,
      (data) => {
        list = mergeBgColors(data, newsBackgroundColors, tagBackgroundColors)
      },
      (error) => {
        console.log(error)
      }
    )
    return list
  } catch (error) {
    console.log(error)
    return null
  }
}

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
