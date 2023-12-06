import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/store"
import { callPostApiWithAuth } from "@/utils/api"
import TimeAgo from "@/utils/time-ago"
import timeAgo from "@/utils/time-ago"
import { formatDistanceToNow, set } from "date-fns"
import {
  Heart,
  MessagesSquare,
  MoreHorizontal,
  Plus,
  Repeat,
} from "lucide-react"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SubCommentCardProps {
  data: any
  followButton?: boolean
  getComments?: () => void
}

export default function SubCommentCard({
  followButton,
  data,
  getComments,
}: SubCommentCardProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = useAppSelector((state) => state.user?.token)
  const handleFollow = async (id: number, follow = true) => {
    setLoading(true)

    await callPostApiWithAuth(
      "lemmy",
      "/community/follow",
      {
        community_id: id,
        follow,
      },

      (e) => {
        setLoading(false)
        setIsFollowing(true)
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Unable to follow",
          description: err,
        })
      }
    )
  }

  useEffect(() => {
    if (data.subscribed === "Subscribed") setIsFollowing(true)
  }, [data])

  const handleLike = async (id: number, score: number) => {
    setLoading(true)
    await callPostApiWithAuth(
      "lemmy",
      "/comment/like",
      {
        comment_id: id,
        score: score,
      },

      (e) => {
        setLoading(false)
        if (getComments) {
          getComments()
        }
        toast({
          variant: "success",
          title: "Comment like",
          description: "Comment liked Successfully",
        })
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Unable to Like the comment",
          description: err,
        })
      }
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex  flex-col w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={data?.creator?.avatar || "/images/profile-image.jpg"}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="flex flex-[1_0_0] flex-wrap">
            <div className="flex flex-col flex-[1_0_0] ">
              <div className="flex items-center gap-[6px] ">
                <div className="flex gap-2 text-[14px] leading-5">
                  <div className="font-semibold">
                    {data?.creator?.display_name}
                  </div>
                  <div>@{data?.creator?.name}</div>•
                  <div>{timeAgo(data?.comment?.published)}</div>
                </div>
                {data?.comment?.sentiment === "bullish" && (
                  <div className="h-4 mr-auto px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-green-70 border border-brand-green-70">
                    Bullish
                  </div>
                )}
                {data?.comment?.sentiment === "bearish" && (
                  <div className="h-4 mr-auto px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-red-70 border border-brand-red-70">
                    Bearish
                  </div>
                )}
                {data?.comment?.sentiment === "neutral" && (
                  <div className="h-4 mr-auto px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-yellow-600 border border-yellow-600">
                    Neutral
                  </div>
                )}
              </div>
              <div className="flex gap-[6px] text-xs dark:text-brand-gray-30 text-brand-gray-60">
                Replying to{" "}
                <span className="text-brand-blue-70">
                  @{data?.creator?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm dark:text-white text-brand-gray-100 line-clamp-2 my-1">
          {data?.comment?.content}
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5">
          <button className="post-action-button">
            <MessagesSquare size={18} />
            <div>{data?.counts?.child_count}</div>
          </button>
          {/* <button className="post-action-button">
            <Repeat size={16} className="rotate-90" />
            <div>{data?.counts?.score}</div>
          </button> */}
          <button
            className="post-action-button"
            onClick={() => handleLike(data?.comment?.id, data?.my_vote ? 0 : 1)}
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
