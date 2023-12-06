"use client"

import React, { useLayoutEffect, useState } from "react"

import "@/styles/common-page.css"
import { useParams } from "next/navigation"
import { useAppSelector } from "@/store"
import { callGetApiWithAuth } from "@/utils/api"

import { Button } from "@/components/ui/button"
import SelectTradeModal from "@/components/modal/script/select-trade"
import NewsLi from "@/components/news/news-li"

const SpecificNews = () => {
  const token = useAppSelector((state) => state.user.token)
  const script = useParams().name
  const [news, setnews] = useState<any>([])

  const fetchNews = () => {
    callGetApiWithAuth(
      "default",
      `/news?q=${script}&count=20`,

      (res) => {
        setnews(res)
      },
      token,
      (err) => {
        console.log(err)
      }
    )
  }
  useLayoutEffect(() => {
    if (token && !news) fetchNews()
  }, [token])
  return (
    <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow !mt-0 max-md:px-0 max-md:pt-0">
      <div className="w-full mx-auto mt-6 max-w-[800px] ">
        {news?.map((news: any, i: number) => (
          <NewsLi news={news} key={i} mobileView />
        ))}
      </div>

      <div className="max-md:hidden flex justify-center text-brand-gray-60 font-medium">
        You reached end of the list
      </div>
      <div className="md:hidden  w-full fixed bg-white top-[588px] flex justify-between items-center gap-4 -ml-4 -mr-4 px-5 py-4">
        <div className="w-full">
          <div className="text-brand-gray-50 text-sm  dark:text-brand-gray-30">
            Today’s volume
          </div>
          <div className="black-600 text-base dark:text-white">32,387.99</div>
        </div>
        <div className="w-full">
          <SelectTradeModal />
        </div>
      </div>
    </div>
  )
}

export default SpecificNews
