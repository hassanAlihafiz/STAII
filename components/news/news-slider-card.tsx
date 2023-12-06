import React from "react"
import Image from "next/image"

import { NewsFeed } from "@/types/news"

const NewsCard = ({ item: feed }: { item: NewsFeed }) => {
  return (
    <div
      className="w-[255px] max-w-[210px] md:max-w-[255px] overflow-hidden rounded-xl"
      style={{
        backgroundColor: feed.bgColor,
      }}
    >
      <a
        href={feed?.url}
        target="_blank"
        className="relative h-[98px] block max-h-[98px] w-full"
      >
        <img
          className="w-full h-full object-cover"
          src={
            feed?.image?.thumbnail?.contentUrl
              ? `${feed.image?.thumbnail?.contentUrl}&w=255`
              : "/images/news/placeholder.png"
          }
          alt=""
          // fill
          // placeholder="blur"
          // blurDataURL="/images/news/placeholder.png"
        />
      </a>

      <div className={`bg-${feed.bgColor} w-full px-2 md:px-4 py-3`}>
        <a
          className="mb-4 max-h-10 w-full overflow-hidden block text-ellipsis text-sm font-medium  text-[#2A3033]"
          href={feed?.url}
          target="_blank"
        >
          {feed.name}
        </a>
        <div className="flex items-center justify-between">
          <div className="mr-1 flex items-center justify-start">
            <div className="relative mr-1 h-3 w-3">
              {feed?.provider && feed?.provider[0]?.image?.thumbnail ? (
                <Image
                  src={feed?.provider[0]?.image?.thumbnail?.contentUrl}
                  alt=""
                  fill
                />
              ) : (
                <span className="w-full h-full rounded-full bg-black" />
              )}
            </div>
            <p className="md:min-w-max overflow-hidden text-ellipsis h-3 max-w-[60px] md:max-w-[940px] text-[10px] font-medium text-[#6A7381]">
              {feed.provider?.[0].name}
            </p>
          </div>

          {feed?.mentions && (
            <div
              className={` ml-2 flex h-4 items-center rounded-full p-1 overflow-hidden text-ellipsis whitespace-nowrap `}
              style={{
                backgroundColor: feed.tagBgColor,
              }}
            >
              <span className="text-[10px] text-white text-ellipsis">
                {feed.mentions[0].name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsCard

export const newsCardRespnosiveness = {
  0: {
    spaceBetween: 12,
    slidesPerView: 1.55,
  },
  640: {
    spaceBetween: 12,
    slidesPerView: 2.6,
  },
  860: {
    spaceBetween: 12,
    slidesPerView: 3,
  },
}
