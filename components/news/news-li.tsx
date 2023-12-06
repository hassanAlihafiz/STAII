import React from "react"
import Image from "next/image"
import Link from "next/link"
import { marketNews } from "@/utils/news"
import { Dot } from "lucide-react"
import moment from "moment"

import { NewsFeed } from "@/types/news"

interface Props {
  news: NewsFeed
  mobileView?: boolean
}
const NewsLi = ({ news, mobileView = false }: Props) => {
  return (
    <div
      className={` border-b border-b-[#EDEEF3] dark:border-b-[#202A41] py-3  w-full flex items-center justify-start  rounded-sm transition-all ${
        !mobileView && "md:flex-row-reverse md:py-5"
      }`}
    >
      <div
        className={`flex flex-col h-full  w-4/6 mr-6 flex-grow md:h-[100px] ${
          !mobileView && "md:!h-[150px]"
        }`}
      >
        <Link target="_blank" href={news.url}>
          <h3
            className={`text-sm font-medium text-[#2A3033] dark:text-white max-w-full max-h-[64px] overflow-hidden text-ellipsis h-[64px]  mb-1 md:h-auto  ${
              !mobileView && "md:font-semibold md:mb-2"
            }`}
          >
            {news?.name}
          </h3>
        </Link>
        <p
          className={`hidden ${
            !mobileView &&
            "md:block text-[#6A7381] dark:text-[#D7DBE0] text-xs max-h-[35px] overflow-hidden text-ellipsis mb-auto"
          }`}
        >
          {news.description}
        </p>
        <div className="flex items-center w-full justify-start mt-2 text-xs text-[#9CA5AF] md:mt-auto ">
          <span
            className={
              !mobileView
                ? "text-[#2B2D42] dark:text-[#9CA5AF] font-semibold"
                : ""
            }
          >
            {news.provider[0].name}
          </span>
          <Dot size={20} className={!mobileView ? "hidden" : ""} />
          {!mobileView &&
            news?.mentions?.map((tag: any, i: number) => {
              if (i >= 3) return <></>
              return (
                <div className="py-[1px] px-1 bg-[#EFF6FF] rounded-2xl items-center hidden md:flex ml-4 border border-[#E6F0FF] text-[#2A3033] dark:bg-[#202A41] text-xs  dark:text-white dark:border-[#2D374E] text-center">
                  {tag.name}
                </div>
              )
            })}
          <span className={!mobileView ? "ml-auto" : ""}>
            {moment(news.datePublished).fromNow()}
          </span>
        </div>
      </div>
      <Link
        target="_blank"
        href={news.url}
        className={`h-[72px] w-[72px] aspect-square overflow-hidden m-auto relative  mb-auto rounded-[8px] border-none ${
          !mobileView && "md:w-[250px] md:h-[150px] md:aspect-auto mx-4"
        }`}
      >
        <img
          src={
            news?.image?.thumbnail?.contentUrl
              ? `${news.image?.thumbnail?.contentUrl}&w=260`
              : "/images/news/placeholder.png"
          }
          alt=""
          className="object-fill w-full h-full"
        />
      </Link>
    </div>
  )
}

export default NewsLi
