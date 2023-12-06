"use client"

import React from "react"

import "@/styles/common-page.css"
import { peopleCardData, postCardData } from "@/utils/community"

import EmptyState from "@/components/ui/empty-state"
import CommunityPostCard from "@/components/community/post-card"

export default function Watchlist() {
  return (
    <div className="!mt-0 dark:dark-card-box max-md:dark:bg-transparent max-md:dark:border-0 max-md:dark:p-0">
      {!peopleCardData ? (
        postCardData.map((data, index) => <CommunityPostCard data={data} />)
      ) : (
        <EmptyState
          title="No Assets added to Watchlist"
          detail="After you will select assets you would like to follow there will appears new about them"
          btnTitle="Go to Markets Page"
          BtnRoute="/market/assets"
          mainImage="/images/community/no-state-image.svg"
        />
      )}
    </div>
  )
}
