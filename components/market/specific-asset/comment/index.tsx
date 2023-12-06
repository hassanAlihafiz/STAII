"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MoreHorizontal,
  Plus,
  Repeat,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import PostDetailDrawer from "@/components/drawer/post-detail"

interface commentProps {
  data: {
    name: string
    profileImage: string
    username: string
    bluetick: boolean
    bearish?: boolean
    bullish?: boolean
    detail: string
    postImage?: string
    comment: number
    share: number
    like: number
  }
  followButton?: boolean
}

export default function CommentCard({ data, followButton }: commentProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedDetailProps = showAll
    ? data?.detail
    : data?.detail?.slice(0, 200)
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex gap-4 flex-col w-full">
        <div className="flex items-center gap-2">
          <div>
            <Image
              className="w-10 h-10 rounded-full object-cover"
              src={data?.profileImage}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="flex flex-[1_0_0] flex-wrap">
            <div className="flex flex-col flex-[1_0_0] ">
              <div className="flex items-center gap-[6px]">
                <div className="text-[14px] font-semibold leading-5">
                  {data?.name}
                </div>
                {data?.bluetick && (
                  <Image
                    className="w-[18px] h-[18px] rounded-full"
                    src="/icons/verified-check.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                )}
                {data?.bullish && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-green-70 border border-brand-green-70">
                    Bullish
                  </div>
                )}
                {data?.bearish && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-red-70 border border-brand-red-70">
                    Bearish
                  </div>
                )}
              </div>
              <div className="flex gap-[6px] text-xs dark:text-brand-gray-30 text-brand-gray-60">
                <div>{data?.username}</div>
                <div>2m</div>
              </div>
            </div>
            {followButton && (
              <Button
                className="flex items-center gap-1 w-fit h-fit px-4 py-[8px] rounded-[32px] border border-brand-green-40 dark:border-transparent font-medium capitalize"
                variant="ghost"
              >
                <Plus className="w-4 h-4" />
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className="text-sm dark:text-white text-brand-gray-100 ">
          <div>{displayedDetailProps}</div>
          {!showAll && (
            <div
              onClick={() => setShowAll(true)}
              className="text-brand-blue-70 text-sm font-medium flex cursor-pointer mt-1"
            >
              View All
              <ChevronDown size={20} color="#1D5BD8" strokeWidth={2} />
            </div>
          )}
          {showAll && (
            <div
              onClick={() => setShowAll(false)}
              className="text-brand-blue-70 text-sm font-medium flex  cursor-pointer mt-1"
            >
              View less
              <ChevronUp
                size={20}
                color="#1D5BD8"
                strokeWidth={2}
                className="ml-1"
              />
            </div>
          )}
        </div>
        {data?.postImage && (
          <div>
            <Image
              className="w-[200px] h-[125px] rounded-lg"
              src={data?.postImage}
              width={200}
              height={125}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5">
          <button className="post-action-button">
            {/* <PostDetailDrawer /> */}
            <div>{data?.comment}</div>
          </button>
          <button className="post-action-button">
            <Repeat size={16} className="rotate-90" />
            <div>{data?.share}</div>
          </button>
          <button className="post-action-button">
            <Heart size={18} />
            <div>{data?.like}</div>
          </button>
        </div>
        <button className="post-action-button">
          <MoreHorizontal size={16} />
          More
        </button>
      </div>
      <hr className="divider" />
    </div>
  )
}
