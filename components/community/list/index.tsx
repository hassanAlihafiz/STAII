"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import { useAppDispatch, useAppSelector } from "@/store"
import { setCommunityData } from "@/store/slices/community-slice"
import { callGetApiWithAuth } from "@/utils/api"
import { getTrendingCommunities } from "@/utils/community"

import EmptyState from "@/components/ui/empty-state"

import PeopleCard from "../people-card"

export default function ListCommunities({ isVisible }: { isVisible: boolean }) {
  const [communityData, setCommunityData] = useState([])
  const profile = useAppSelector((state) => state.user.profile)
  const token = useAppSelector((state) => state.user.token)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState<null | {
    status: number
    message: string
  }>(null)
  console.log(communityData)
  const getCommunities = () => {
    if (!isVisible) return
    setLoading(true)
    callGetApiWithAuth(
      "lemmy",
      "/community/list",

      (e) => {
        setCommunityData(e?.communities)
      },
      token,
      (err) => {
        console.log(err)
        seterror({ message: err.message, status: err?.status })
      }
    )
    setLoading(false)
  }

  useEffect(() => {
    getCommunities()
  }, [isVisible, profile])

  if (!isVisible) return <></>
  if (communityData)
    return (
      <>
        {communityData?.map((data, index) => (
          <PeopleCard data={data} key={index} />
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
