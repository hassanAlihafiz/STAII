import React from "react"
import { peopleCardData, postCardData } from "@/utils/community"

import EmptyState from "@/components/ui/empty-state"
import PeopleCard from "@/components/community/people-card"
import CommunityPostCard from "@/components/community/post-card"

interface TabsProps {
  activeTab?: string
}
const Tabs: React.FC<TabsProps> = ({ activeTab }) => {
  return (
    <>
      {activeTab === "All" &&
        postCardData.map((data) => (
          <CommunityPostCard followButton data={data} />
        ))}
      {activeTab === "Original" &&
        postCardData.map((data) => (
          <CommunityPostCard followButton data={data} />
        ))}
      {activeTab === "Links" &&
        postCardData.map((data) => (
          <CommunityPostCard followButton data={data} />
        ))}
      {activeTab === "Media" &&
        postCardData.map((data) => (
          <CommunityPostCard followButton data={data} />
        ))}
      {activeTab === "People" &&
        peopleCardData.map((data) => <PeopleCard data={data} />)}

      {activeTab === "My Posts" && (
        <EmptyState
          title="You haven’t made any publications"
          detail="Tell the world your thoughts. Start typing in the field above and make a post"
          mainImage="/images/community/no-state-image.svg"
        />
      )}
    </>
  )
}

export default Tabs
