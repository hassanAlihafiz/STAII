"use client"

import React from "react"
import { useAppSelector } from "@/store"

import MultiCardSlider from "@/components/features/multicard-slider"
import NewsCard, {
  newsCardRespnosiveness,
} from "@/components/news/news-slider-card"

const NewsSection = () => {
  const news = useAppSelector((state) => state.news)
  return (
    <>
      <MultiCardSlider
        cardComponent={NewsCard}
        data={news?.stocks?.data}
        heading="Stocks"
        responsiveness={newsCardRespnosiveness}
      />
      <MultiCardSlider
        cardComponent={NewsCard}
        data={news?.business?.data}
        heading="Business"
        responsiveness={newsCardRespnosiveness}
      />
      <MultiCardSlider
        cardComponent={NewsCard}
        data={news?.crypto?.data}
        heading="Crypto"
        responsiveness={newsCardRespnosiveness}
      />
      <MultiCardSlider
        cardComponent={NewsCard}
        data={news?.economy?.data}
        heading="Economy"
        responsiveness={newsCardRespnosiveness}
      />
    </>
  )
}

export default NewsSection
