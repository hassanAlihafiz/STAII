"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import AddPost from "@/components/community/add-post"
import ListCommunities from "@/components/community/list"
import ListPosts from "@/components/community/list-posts"

export default function Recommended() {
  const [activeTab, setActiveTab] = useState("Top")
  const [isUpdate, setIsUpdate] = useState(false)

  const handleActiveTab = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="!mt-0 dark:dark-card-box max-md:mb-6">
      <AddPost setIsUpdate={setIsUpdate} isPost={true} />
      <div>
        <div className="flex gap-1">
          <div
            onClick={() => handleActiveTab("Top")}
            className={`post-tab ${activeTab === "Top" && "post-tab-active"}`}
          >
            Top
          </div>
          <div
            onClick={() => handleActiveTab("People")}
            className={`post-tab ${
              activeTab === "People" && "post-tab-active"
            }`}
          >
            People
          </div>
          <div
            onClick={() => handleActiveTab("My Post")}
            className={`post-tab ${
              activeTab === "My Post" && "post-tab-active"
            }`}
          >
            My posts
          </div>
        </div>
      </div>

      <ListPosts
        isVisible={activeTab === "Top"}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
      <ListCommunities isVisible={activeTab === "People"} />
      {/* {activeTab === "My Post" && ( */}
      <ListPosts
        isVisible={activeTab === "My Post"}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        showMyPosts={activeTab === "My Post"}
      />
      {/* )} */}

      {/* {activeTab === "My Post" && (
        <EmptyState
          title="You haven’t made any publications"
          detail="Tell the world your thoughts. Start typing in the field above and make a post"
          mainImage="/images/community/no-state-image.svg"
        />
      )} */}
    </div>
  )
}
