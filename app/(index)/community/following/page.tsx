"use client"

import React from "react"

import "@/styles/common-page.css"
import { postCardData } from "@/utils/community"

import AddPost from "@/components/community/add-post"
import CommunityPostCard from "@/components/community/post-card"

export default function Following() {
  return (
    <div className="!mt-0 dark:dark-card-box max-md:dark:bg-transparent max-md:dark:border-0 max-md:dark:p-0">
      <AddPost />
      {postCardData.map((data, index) => (
        <CommunityPostCard data={data} />
      ))}
    </div>
  )
}
