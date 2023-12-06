"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { watchlist } from "@/utils/home"
import { PenBox } from "lucide-react"

import CommunityNavHeader from "@/components/community/nav-header"
import TrendingCommunities from "@/components/community/trending"
import Watchlist from "@/components/watchlist/watchlist"

const CommunityLayout = ({ children }: { children: React.ReactElement }) => {
  const pathname = usePathname()
  const isRecommendedCommunityRoute =
    pathname === "/community" || pathname === "/community/following"

  return (
    <section className="w-full px-4 max-w-[1206px] mx-auto pt-10">
      {pathname !== "/community/5" && <CommunityNavHeader />}
      <div className="mt-8 grid grid-cols-3 gap-10 ">
        <div className="col-span-3 md:col-span-2">{children}</div>
        {isRecommendedCommunityRoute && (
          <div className="md:hidden absolute bottom-0 right-0">
            <div className="flex flex-col items-center justify-center bg-[#069D6E] w-[70px] h-[70px] rounded-[10px] fixed bottom-32 right-9">
              <PenBox size={30} className="stroke-white" />
            </div>
          </div>
        )}
        <div className="dark:dark-card-box !mt-0 max-md:hidden col-span-1 h-fit rounded-xl shadow-[0px_3px_15px_0px] shadow-[rgba(11,_50,_67,_0.05)] flex flex-col gap-5 py-6 px-3 sticky top-2">
          <TrendingCommunities />
          <Watchlist list={watchlist} title="Trending Assets" />
        </div>
      </div>
    </section>
  )
}

export default CommunityLayout
