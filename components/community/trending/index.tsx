import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useAppSelector } from "@/store"
import { getTrendingCommunities } from "@/utils/community"

import { CommunityData } from "@/types/community"

const TrendingCommunities = () => {
  const [trendingList, setTrendingList] = useState<CommunityData[] | null>(null)
  const comunities = useAppSelector((state) => state.community.communityData)

  useEffect(() => {
    if (comunities) {
      const trendingList = getTrendingCommunities(comunities)
      setTrendingList(trendingList)
    }
  }, [comunities])
  return (
    <>
      <div>
        <div className="text-lg font-semibold px-3">🔥 Trending Topics</div>
        {trendingList?.map((topic, index) => (
          <Link
            href={`/community/${topic?.community?.id}`}
            className="py-2 px-3 flex gap-2  hover:bg-brand-gray-10 dark:hover:bg-brand-blue-90 hover:rounded-lg cursor-pointer"
          >
            <div className="text-[#9CA5AF]">{index + 1}</div>
            <div className="font-semibold">#{topic?.community?.name}</div>
          </Link>
        ))}
      </div>
      <hr className="mx-3 border-[#EDEEF3]" />
    </>
  )
}

export default TrendingCommunities
