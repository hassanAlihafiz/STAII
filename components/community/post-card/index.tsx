"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/store"
import { callPostApiWithAuth } from "@/utils/api"
import timeAgo from "@/utils/time-ago"
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessagesSquare,
  MoreHorizontal,
  Plus,
  Repeat,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import PostDetailDrawer from "@/components/drawer/post-detail"

interface CommunityTopCardProps {
  data: any
  followButton?: boolean
  getPost?: () => void
}

export default function CommunityPostCard({
  data,
  followButton,
  getPost,
}: CommunityTopCardProps) {
  const [showAll, setShowAll] = useState(false)
  const [isDrawer, setIsDrawer] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = useAppSelector((state) => state.user?.token)
  const displayedDetailProps = showAll
    ? data?.post?.body
    : data?.post?.body?.slice(0, 150)
  const shouldShowViewAllButton = data?.post?.body?.length > 150
  const handleOpen = () => {
    setIsDrawer(true)
  }
  const handleClose = () => {
    setIsDrawer(false)
    if (getPost) {
      getPost()
    }
  }
  const handleLike = async (id: number, score: number) => {
    setLoading(true)
    await callPostApiWithAuth(
      "lemmy",
      "/post/like",
      {
        post_id: id,
        score: score,
      },

      (e) => {
        setLoading(false)
        if (getPost) {
          getPost()
        }
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Unable to Like the post",
          description: err,
        })
      }
    )
  }

  console.log(data)
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex gap-4 flex-col w-full">
        <div className="flex items-center gap-2">
          <div>
            {data?.creator?.avatar ? (
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={data?.creator?.avatar}
                width={40}
                height={40}
                alt=""
              />
            ) : (
              <Image
                className="w-10 h-10 rounded-full object-cover"
                src={"/images/profile-image.jpg"}
                width={40}
                height={40}
                alt=""
              />
            )}
          </div>
          <div className="flex flex-[1_0_0] flex-wrap">
            <div className="flex flex-col flex-[1_0_0] ">
              <div className="flex items-center gap-[6px]">
                <div className="text-[14px] font-semibold leading-5">
                  {data?.creator?.display_name
                    ? data?.creator?.display_name
                    : data?.creator?.name}
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
                {data?.post?.sentiment === "bullish" && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-green-70 border border-brand-green-70">
                    Bullish
                  </div>
                )}
                {data?.post?.sentiment === "bearish" && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-red-70 border border-brand-red-70">
                    Bearish
                  </div>
                )}
                {data?.post?.sentiment === "neutral" && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-yellow-600 border border-yellow-600">
                    Neutral
                  </div>
                )}
              </div>
              <div className="flex gap-[6px] text-xs dark:text-brand-gray-30 text-brand-gray-60">
                <Link
                  href={`/community/${data?.community?.id}`}
                  // className="hover:underline"
                >
                  @{data?.community?.name}
                </Link>
                <div>{timeAgo(data?.post?.published)}</div>
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
          {shouldShowViewAllButton && !showAll && (
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
        <div>
          {console.log(data)}
          {data?.post?.url && (
            <img
              className="w-auto max-h-[125px] rounded-lg"
              src={data?.post?.url}
              // width={200}
              // height={125}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5">
          <button className="post-action-button">
            <MessagesSquare size={18} onClick={handleOpen} />
            <PostDetailDrawer
              id={data?.post?.id}
              isOpen={isDrawer}
              onClose={handleClose}
            />
            <div>{data?.counts?.comments}</div>
          </button>

          <button
            onClick={() => handleLike(data?.post?.id, data?.my_vote ? 0 : 1)}
            className="post-action-button"
          >
            <Heart
              size={18}
              fill={`${data?.my_vote ? "red" : "white"}`}
              className={data?.my_vote && "text-red-600"}
            />
            <div>{data?.counts?.score}</div>
          </button>
        </div>
        {/* <button className="post-action-button">
          <MoreHorizontal size={16} />
          More
        </button> */}
      </div>
      <hr className="divider" />
    </div>
  )
}
