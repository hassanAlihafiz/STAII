import React, { useEffect, useState } from "react"
import { fetchCommunities } from "@/async-functions/community"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  attachCommunityScriptInfo,
  getSubscribedCommunities,
  getTrendingCommunities,
} from "@/utils/community"
import { sliderStocks } from "@/utils/stocks"
import { set } from "date-fns"

import MultiCardSlider from "@/components/features/multicard-slider"
import StockSliderCard, {
  stockSliderCardRespnosiveness,
} from "@/components/stock/stock-cards/slider-card"
import { CommunityData } from "@/types/community"

const SocialFeeds = () => {
  const dispatch = useAppDispatch()
  const [communityScripts, setCommunityScripts] = useState<
    CommunityData[] | null
  >(null)
  const communities = useAppSelector((state) => state.community.communityData)
  const token = useAppSelector((state) => state.user.token)
  useEffect(() => {
    if (communities) {
      let subscribedCommunities = getSubscribedCommunities(communities)
      if (subscribedCommunities.length < 7) {
        subscribedCommunities = subscribedCommunities.concat(
          getTrendingCommunities(communities)
        )
      }
      setCommunityScripts(attachCommunityScriptInfo(communities))
    }
  }, [communities, token])

  return (
    <MultiCardSlider
      cardComponent={StockSliderCard}
      data={communityScripts}
      heading="Social Feed"
      responsiveness={stockSliderCardRespnosiveness}
      seeAllLink="/social-feed"
    />
  )
}

export default SocialFeeds
