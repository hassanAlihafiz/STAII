import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/store"
import { callPostApiWithAuth } from "@/utils/api"
import convertToUserLocalTime from "@/utils/time-ago"
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

interface CommentCardProps {
  data: any
  followButton?: boolean
  getComments: () => void
}

export default function CommentCard({
  followButton,
  data,
  getComments,
}: CommentCardProps) {
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
      token!,
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

  const handleCommentLike = async (id: number, score: number) => {
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
        getComments()
      },
      token!,
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
  useEffect(() => {
    if (data.subscribed === "Subscribed") setIsFollowing(true)
  }, [data])
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex  flex-col w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <Image
              className="w-full h-full rounded-full object-cover"
              src={data?.creator?.avatar || "/images/profile-image.jpg"}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="flex flex-[1_0_0] flex-wrap">
            <div className="flex flex-col flex-[1_0_0] ">
              <div className="flex items-center gap-[6px]">
                <div className="text-[14px] font-semibold leading-5">
                  {data?.creator?.display_name}
                </div>
                {data?.creator?.bluetick && (
                  <Image
                    className="w-[18px] h-[18px] rounded-full"
                    src="/icons/verified-check.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                )}
                {data?.creator?.bullish && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-green-70 border border-brand-green-70">
                    Bullish
                  </div>
                )}
                {data?.creator?.bearish && (
                  <div className="h-4 px-[6px] text-[10px] leading-4 rounded-[10px] flex items-center text-brand-red-70 border border-brand-red-70">
                    Bearish
                  </div>
                )}
              </div>
              <div className="flex gap-[6px] text-xs dark:text-brand-gray-30 text-brand-gray-60">
                <div>@{data?.creator?.name}</div>
                <div>{data?.comment?.published}</div>
              </div>
            </div>
            {followButton && isFollowing ? (
              <AsyncButton
                loading={loading}
                variant={"outline"}
                onClick={() => handleFollow(data?.community?.id, false)}
                className="w-[96px] h-fit py-[10px] "
              >
                Following
              </AsyncButton>
            ) : (
              <AsyncButton
                loading={loading}
                className="flex items-center justify-center w-[96px] h-fit py-[10px] rounded-[10px] border border-brand-green-40 dark:border-transparent font-medium capitalize"
                variant="ghost"
                onClick={() => handleFollow(data?.community?.id)}
              >
                Follow
              </AsyncButton>
            )}
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
          <button className="post-action-button">
            <Repeat size={16} className="rotate-90" />
            <div>{data?.counts?.score}</div>
          </button>
          <button
            className="post-action-button"
            onClick={() =>
              handleCommentLike(data?.comment?.id, data?.my_vote ? 0 : 1)
            }
          >
            <Heart size={18} fill={`${data?.my_vote ? "red" : "white"}`} />
            <div>{data?.counts?.upvotes}</div>
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
