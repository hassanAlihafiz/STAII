"use client"

import React from "react"
import { Bell, Search, Star } from "lucide-react"

import CreateCommunityModal from "../modal/community/create-community"
import SubNavHeader from "../ui/sub-nav-header"

const CommunitySubPages = [
  {
    name: "Recommended",
    href: "/community",
  },
  {
    name: "Following",
    href: "/community/following",
  },
  {
    name: "Watchlist",
    href: "/community/watchlist",
  },
  {
    name: "Learning",
    href: "/community/learning",
  },
]
Object.freeze(CommunitySubPages)
const CommunityNavHeader = ({
  children,
}: {
  children?: React.ReactElement
}) => {
  return (
    <>
      <div className="flex item-center justify-between">
        <h1 className="page-h1">Community</h1>
        <CreateCommunityModal />
        <div className="md:hidden flex item-center gap-5">
          <Search className="stroke-brand-green-70" />
          <Bell className="stroke-brand-green-70" />
          <Star className="stroke-brand-green-70" />
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <SubNavHeader pageData={CommunitySubPages} />
        {children}
      </div>
    </>
  )
}

export default CommunityNavHeader
