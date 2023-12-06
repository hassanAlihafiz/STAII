"use client"

import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { setFulfilled } from "@/store/slices/news-slice"
import { callGetApiWithAuth } from "@/utils/api"

import NewsLi from "@/components/news/news-li"

const NewsPage = () => {
  const news = useAppSelector((state) => state.news?.business)
  const token = useAppSelector((state) => state.user.token)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isMore, setIsMore] = useState(true)
  const [page, setPage] = useState(2) // Track the current page
  const loadMoreData = async () => {
    setIsLoading(true)

    await callGetApiWithAuth(
      "default",
      "/news/business?count=" + page * 10,
      (res) => {
        dispatch(setFulfilled({ category: "business", data: res }))
        // setPage((prevPage) => prevPage + 1)
        console.log(res?.length, news?.data?.length)
        if (res?.length === news?.data?.length) {
          setIsMore(false)
        }
        setIsLoading(false)
      },
      token,
      (err) => {
        console.log(err)
      }
    )
    console.log("here right after", isMore)
  }
  useEffect(() => {
    const handleScroll = () => {
      let contentHeight
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        contentHeight = document.documentElement.offsetHeight - 120
      } else {
        contentHeight = document.documentElement.offsetHeight - 400
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        contentHeight
      ) {
        console.log(isMore)
        if (!isLoading && isMore) {
          loadMoreData()
          setPage((prevPage) => prevPage + 1)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isLoading])

  return (
    <>
      <div className="w-full mx-auto mt-6 max-w-[800px] max-md:pl-4">
        {news?.data?.map((news, i) => (
          <NewsLi news={news} key={i} />
        ))}
        {isLoading && (
          <div className="w-full my-6 grid place-items-center">
            <div
              className="spin-loader h-5 w-5 text-gray-400 dark:text-white"
              role="status"
            />
          </div>
        )}
        {!isMore && (
          <p className="w-full my-6 grid  mx-auto place-items-center  text-[#6A7381] dark:text-[#D7DBE0] ">
            You reached end of the list
          </p>
        )}
      </div>
    </>
  )
}

export default NewsPage
