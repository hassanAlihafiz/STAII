"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/store"
import {
  callGetApi,
  callGetApiWithAuth,
  callPostApiWithAuth,
} from "@/utils/api"
import { postCardData2 } from "@/utils/community"
import { MoreHorizontal } from "lucide-react"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"
import { toast } from "@/components/ui/use-toast"
import BackButton from "@/components/auth/onboarding/back-btn"
import CommentCard from "@/components/common/comment-card"
import CommunityPostCard from "@/components/community/post-card"
import Tab from "@/components/community/user-profile/tab"

interface CommunityData {
  community: {
    title: string
    name: string
    icon: any
    id: number
  }
  subscribed: string
  counts: {
    subscribers: string
    posts: string
    comments: string
  }
}
function UserProfile({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState(1)
  const [postData, setPostData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [communityData, setCommunityData] = useState<CommunityData | null>(null)
  const [error, setError] = useState<null | {
    status: number
    message: string
  }>(null)
  const token = useAppSelector((state) => state.user.token)
  const getCommunitiesById = () => {
    callGetApiWithAuth(
      "lemmy",
      `/community?id=${params.id}`,

      (e) => {
        setCommunityData(e?.community_view)
      },
      token!,
      ({ message: err, status }) => {
        setError({ message: err, status })
        setLoading(false)
      }
    )
  }

  const getPostByCommunityId = () => {
    callGetApiWithAuth(
      "lemmy",
      `/post/list?community_id=${params.id}`,

      (e) => {
        setPostData(e?.posts)
        setLoading(true)
      },
      token!,
      ({ message: err, status }) => {
        setError({ message: err, status })
        setLoading(false)
      }
    )
  }

  const getCommentsByCommunityId = () => {
    callGetApiWithAuth(
      "lemmy",
      `/comment/list?community_id=${params.id}&page=1&limit=20`,

      (e) => {
        setCommentData(e?.comments)
        setLoading(true)
      },
      token!,
      ({ message: err, status }) => {
        setError({ message: err, status })
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (params?.id) {
      getCommunitiesById()
      getPostByCommunityId()
      getCommentsByCommunityId()
    }
  }, [])

  const followCommunity = async (id: number, follow: boolean) => {
    setLoader(true)
    await callPostApiWithAuth(
      "lemmy",
      "/community/follow",
      {
        community_id: id,
        follow,
      },
      (e) => {
        setLoader(false)
        setCommunityData(e?.community_view)
      },
      token!,
      ({ message: err, status }) => {
        console.error(err, status)
        setLoader(false)
        toast({
          variant: "destructive",
          title: "Unable to follow",
          description: err,
        })
      }
    )
  }
  return (
    loading && (
      <div>
        <BackButton />
        <div>
          <div className="sm:flex items-start gap-4">
            <div className="max-sm:flex justify-center max-sm:mb-3">
              <div className="w-[104px] h-[104px] rounded-full border border:brand-gray-30">
                <Image
                  src={communityData?.community?.icon}
                  width={104}
                  height={104}
                  alt="btcwirelogo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:userProfileTopCard">
              <div className="flex max-sm:flex-col max-sm:justify-center gap-2 items-center justify-between">
                <div className="max-sm:text-center">
                  <div className="black-xl-600 dark:text-white">
                    {communityData?.community?.title}
                  </div>
                  <div className="text-brand-gray-30 text-base dark:brand-gray-30">
                    @{communityData?.community?.name}
                  </div>
                </div>
                <div className="flex items-center gap-4 max-sm:mt-2">
                  <div className="bg-brand-gray-10 p-3 rounded-xl cursor-pointer">
                    <MoreHorizontal className="stroke-brand-green-70" />
                  </div>
                  {communityData?.subscribed === "Subscribed" ||
                  communityData?.subscribed === "Pending" ? (
                    <AsyncButton
                      loading={loader}
                      className="flex items-center justify-center w-[96px] h-fit py-[10px] rounded-[10px] border border-brand-gray-30 dark:border-transparent dark:bg-brand-gray-30 font-medium dark:text-brand-gray-80 capitalize"
                      variant="ghost"
                      onClick={() => {
                        if (communityData?.community?.id !== undefined) {
                          followCommunity(communityData.community.id, false)
                        }
                      }}
                    >
                      Following
                    </AsyncButton>
                  ) : (
                    <AsyncButton
                      loading={loader}
                      className="flex items-center justify-center w-[96px] h-fit py-[10px] rounded-[10px] border border-brand-green-40 dark:border-transparent font-medium capitalize"
                      onClick={() => {
                        if (communityData?.community?.id !== undefined) {
                          followCommunity(communityData?.community?.id, true)
                        }
                      }}
                    >
                      Follow
                    </AsyncButton>
                  )}
                </div>
              </div>
              <div>
                <span className="black-600 dark:text-white">111</span> Following{" "}
                <span className="black-600 dark:text-white">•</span>{" "}
                <span className="black-600 dark:text-white">
                  {communityData?.counts?.subscribers}
                </span>{" "}
                Followers
              </div>
              <div className="text-brand-gray-60 dark:text-brand-gray-30 text-base">
                Your Trusted{" "}
                <span className="text-brand-blue-70 dark:text-brand-blue-60">
                  #Crypto
                </span>{" "}
                &{" "}
                <span className="text-brand-blue-70 dark:text-brand-blue-60">
                  #Blockchain
                </span>{" "}
                Newswire. Maximize Your Reach With Our Crypto Press Release
                Distribution Service.
              </div>
            </div>
          </div>
          <Tab
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            data={communityData?.counts}
          />
          {activeTab === 1 ? (
            !postData?.length ? (
              <EmptyState
                title="Oops! It seems like there are no posts in this community yet."
                detail="Why not be the first to share something interesting or start a discussion?"
                mainImage="/images/community/no-state-image.svg"
              />
            ) : (
              postData?.map((data, index) => (
                <CommunityPostCard
                  data={data}
                  getPost={getPostByCommunityId}
                  key={index}
                />
              ))
            )
          ) : (
            ""
          )}

          {activeTab === 2 ? (
            !commentData?.length ? (
              <EmptyState
                title="Oops! It seems like there are no posts in this community yet."
                detail="Why not be the first to share something interesting or start a discussion?"
                mainImage="/images/community/no-state-image.svg"
              />
            ) : (
              commentData?.map((data, index) => (
                <CommentCard
                  data={data}
                  key={index}
                  getComments={getCommentsByCommunityId}
                />
              ))
            )
          ) : (
            ""
          )}
        </div>
      </div>
    )
  )
}

export default UserProfile
