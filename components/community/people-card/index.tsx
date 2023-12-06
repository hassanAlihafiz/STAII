import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { setCommunityData } from "@/store/slices/community-slice"
import { callPostApiWithAuth } from "@/utils/api"

import { CommunityData, communitySubscribeEvents } from "@/types/community"
import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface PeopleCardProps {
  data: any
  getCommunities?: () => void
}

export default function PeopleCard({ data, getCommunities }: PeopleCardProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = useAppSelector((state) => state.user?.token)
  const handleUserProfile = (id: number) => {
    router.push(`/community/${id}`)
  }
  const communities = useAppSelector((state) => state.community.communityData)
  const handleFollow = async (id: number, follow = true) => {
    setLoading(true)
    const data = {
      community_id: id,
      follow,
    }
    await callPostApiWithAuth(
      "lemmy",
      "/community/follow",
      data,
      (e) => {
        setLoading(false)
        setIsFollowing(true)
        let updatedList: CommunityData[] | undefined = communities?.map(
          (data) => {
            if (data?.community?.id === id) {
              return {
                ...data,
                subscribed:
                  follow === true
                    ? communitySubscribeEvents.Subscribed
                    : communitySubscribeEvents.NotSubscribed,
              }
            }
            return data
          }
        )

        dispatch(setCommunityData(updatedList))
      },
      token,
      (err) => {
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
  console.log(communities)
  return (
    <div className={"mt-6 flex flex-col gap-4"}>
      <div className="flex gap-4 flex-col w-full">
        <div className="flex items-start gap-3">
          <Image
            className="w-10 h-10 rounded-full   object-cover border-2 border-brand-gray-70"
            src={data?.community?.icon || "/images/logo-icon.svg"}
            width={40}
            height={40}
            alt=""
          />
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-[6px]">
                <div
                  onClick={() => handleUserProfile(data?.community?.id)}
                  className="text-[14px] font-semibold leading-5 cursor-pointer"
                >
                  {data?.community?.title}
                </div>
                {data.bluetick && (
                  <Image
                    className="w-[18px] h-[18px] rounded-full"
                    src="/icons/verified-check.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                )}
              </div>
              <div className="text-[10px] dark:text-brand-gray-40 text-[#575773] mb-1">
                {data?.community?.description}
              </div>
              <div className="text-[12px] dark:text-brand-gray-40 text-[#575773]">
                {data?.counts?.subscribers} followers
              </div>
            </div>
            <div>
              {data?.subscribed === "Subscribed" ||
              data?.subscribed === "Pending" ? (
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
        </div>
      </div>

      <hr className="divider" />
    </div>
  )
}
