"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/store"
import { callGetApiWithAuth } from "@/utils/api"
import { newsList } from "@/utils/specific-asset"

interface newsListCardProps {
  imageClass?: string
  descriptionClass?: string
  showMaincontent?: boolean
}
const NewsListCard: React.FC<newsListCardProps> = ({
  imageClass,
  descriptionClass,
  showMaincontent,
}) => {
  const [showAll, setShowAll] = useState(false)
  const token = useAppSelector((state) => state?.user?.token)
  const assetDetails = useAppSelector((state) => state?.stocks.currentStockData)
  const [news, setNews] = useState<any>([])
  const fetchNews = () => {
    callGetApiWithAuth(
      "default",
      `/news?q=${assetDetails?.ticker}&count=20`,
      (res) => {
        setNews(res?.data)
      },
      token,
      (err) => {
        console.log(err)
      }
    )
  }
  useEffect(() => {
    fetchNews()
  }, [])

  const displayedNewsList = showAll
    ? news
    : news && news.length > 0
    ? news.slice(0, 4)
    : []
  return (
    <>
      {showMaincontent ? (
        <>
          {news?.map((news: any) => {
            return (
              <div
                className="flex justify-between gap-3 border-b border-brand-gray-20 dark:border-brand-gray-90 mb-3.5 pb-3.5 "
                key={news?.id}
              >
                <div
                  className={`flex flex-col justify-between ${descriptionClass}`}
                >
                  <div className="black-500 text-sm  dark:text-white">
                    {news?.description}
                  </div>
                  <div className="text-brand-gray-50 text-xs">{news?.time}</div>
                </div>
                <div className={`${imageClass} `}>
                  <Image
                    src={
                      news?.image?.thumbnail.contentUrl === undefined
                        ? "/images/news/placeholder.png"
                        : `${news.image?.thumbnail?.contentUrl}&w=260`
                    }
                    alt=" "
                    width={72}
                    height={72}
                    className="rounded-lg h-[72px] w-[72px]"
                  />
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <>
          {displayedNewsList?.map((news: any) => {
            return (
              <div
                className="flex justify-between gap-3 border-b border-brand-gray-20 dark:border-brand-gray-90 mb-3.5 pb-3.5"
                key={news?.id}
              >
                <div
                  className={`flex flex-col justify-between ${descriptionClass}`}
                >
                  <div className="black-500 text-sm  dark:text-white">
                    {news?.description}
                  </div>
                  <div className="text-brand-gray-50 text-xs">{news?.time}</div>
                </div>
                <div className={`${imageClass} `}>
                  <Image
                    src={
                      news?.image?.thumbnail.contentUrl === undefined
                        ? "/images/news/placeholder.png"
                        : `${news.image?.thumbnail?.contentUrl}`
                    }
                    alt=" "
                    width={72}
                    height={72}
                    className="rounded-lg h-[72px] w-[72px]"
                  />
                </div>
              </div>
            )
          })}
          {!showAll && (
            <div
              onClick={() => setShowAll(true)}
              className="text-brand-green-70 text-sm font-medium flex justify-center cursor-pointer"
            >
              View All
            </div>
          )}
          {showAll && (
            <div
              onClick={() => setShowAll(false)}
              className="text-brand-green-70 text-sm font-medium flex justify-center cursor-pointer"
            >
              View less
            </div>
          )}
        </>
      )}
    </>
  )
}

export default NewsListCard
