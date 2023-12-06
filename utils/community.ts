import { CommunityData } from "@/types/community"

export const trendingTopics = [
  "#SEC",
  "#Coinbase",
  "#Binance",
  "#GaryGensler",
  "#CMCLive",
]

export const postCardData = [
  {
    name: "Optimisium",
    profileImage: "/images/community/doge.jpeg",
    username: "@optimisium",
    bluetick: true,
    bearish: true,
    detail:
      "$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K...$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27",
    postImage: "/images/community/doge.jpeg",
    comment: 0,
    share: 0,
    like: 2,
  },
  {
    name: "CryptoChatter",
    profileImage: "/images/community/doge.jpeg",
    username: "@CryptoChatter",
    bluetick: true,
    bullish: true,
    detail:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney wh made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs",
    postImage: "/images/community/doge.jpeg",
    comment: 1,
    share: 1,
    like: 2,
  },
]

export const postCardData2 = [
  {
    name: "BTXWire",
    profileImage: "/images/community/BTCwireLogo.png",
    username: "@btcwire",
    bluetick: false,
    bearish: false,
    detail:
      "$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K...$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27",
    postImage: "/images/community/doge.jpeg",
    comment: 0,
    share: 0,
    like: 2,
  },
  {
    name: "BTCWire",
    profileImage: "/images/community/BTCwireLogo.png",
    username: "@btcwire",
    bluetick: false,
    bullish: false,
    detail:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney wh made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs",
    postImage: "/images/community/doge.jpeg",
    comment: 1,
    share: 1,
    like: 2,
  },
]

export const peopleCardData = [
  {
    id: 1,
    name: "TradeZone",
    profileImage: "/images/community/doge.jpeg",
    bluetick: false,
    detail: "Experience the power of collective trading. Join our community",
    follow: true,
    followers: "18.2K",
  },
  {
    id: 2,
    name: "MarketMaven",
    profileImage: "/images/community/doge.jpeg",
    bluetick: false,
    detail: "Want to learn how to trade like a pro? Our trading channel offers",
    follow: false,
    followers: "15.8K",
  },
  {
    id: 3,
    name: "TradeZone",
    profileImage: "/images/community/doge.jpeg",
    bluetick: false,
    detail: "Experience the power of collective trading. Join our community",
    follow: false,
    followers: "18.2K",
  },
  {
    id: 4,
    name: "MarketMaven",
    profileImage: "/images/community/doge.jpeg",
    bluetick: false,
    detail: "Want to learn how to trade like a pro? Our trading channel offers",
    follow: false,
    followers: "15.8K",
  },
]

function calculateTrendingScore(community: CommunityData): number {
  const weightedScore =
    community?.counts.hot_rank * 0.7 +
    community?.counts?.users_active_week * 0.3
  return weightedScore
}

export function getTrendingCommunities(communityArray: CommunityData[]): any {
  const communitiesWithScores = communityArray.map((community) => ({
    community,
    trendingScore: calculateTrendingScore(community),
  }))

  communitiesWithScores.sort((a, b) => b.trendingScore - a.trendingScore)

  return communitiesWithScores.slice(0, 5).map((item) => item.community)
}

export function getSubscribedCommunities(
  communityArray: CommunityData[]
): CommunityData[] {
  return communityArray.filter(
    (community) => community.subscribed !== "NotSubscribed"
  )
}

export function attachCommunityScriptInfo(
  communityArray: CommunityData[]
): CommunityData[] {
  return communityArray.map((community, i) => ({
    ...community,
    price: (Math.random() * 100).toFixed(2),
    priceChanged: (
      (Math.random() > 0.5 ? 1 : -1) *
      Math.random() *
      10
    )?.toFixed(2),
  }))
}
