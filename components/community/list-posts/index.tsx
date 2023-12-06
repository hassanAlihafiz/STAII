"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { callGetApiWithAuth } from "@/utils/api"

import EmptyState from "@/components/ui/empty-state"
import CommunityPostCard from "@/components/community/post-card"

export default function ListPosts({
  isVisible,
  isUpdate,
  setIsUpdate,
  showMyPosts = false,
}: {
  isVisible: boolean
  isUpdate?: boolean
  setIsUpdate?: (update: boolean) => void
  showMyPosts?: boolean
}) {
  const [postData, setPostData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState<null | {
    status: number
    message: string
  }>(null)

  const token = useAppSelector((state) => state.user.token)
  const profile = useAppSelector((state) => state.user.profile)
  const getPosts = async () => {
    console.log("getPosts")
    if (!isVisible) return
    setLoading(true)
    await callGetApiWithAuth(
      "lemmy",
      !showMyPosts
        ? `/post/list`
        : `/user?username=${profile?.name?.replaceAll(" ", "")}`,
      
      (e) => {
        setPostData(e?.posts)
      },
      token || "",
      (err) => {
        seterror({ message: err?.message, status: err.status })
      },
    )
    setLoading(false)
  }

  useEffect(() => {
    if (!postData) getPosts()
  }, [token, showMyPosts])
  console.log(postData, showMyPosts)
  useEffect(() => {
    if (isUpdate && setIsUpdate) {
      getPosts()
      setIsUpdate(false)
    }
  }, [isUpdate])
  // useEffect(() => {
  //   if (showMyPosts) getPosts()
  // }, [showMyPosts])
  if (!isVisible) return <></>
  if (postData)
    return (
      <>
        {postData?.map((data: any, index: number) => (
          <CommunityPostCard data={data} key={index} getPost={getPosts} />
        ))}
      </>
    )
  return (
    <EmptyState
      title="You haven’t made any publications"
      detail="Tell the world your thoughts. Start typing in the field above and make a post"
      mainImage="/images/community/no-state-image.svg"
    />
  )
}
