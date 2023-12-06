import { HistoricalColumn } from "./historical-columns"

export function convertToCSV(data: any) {
  const header = Object.keys(data[0]).join(",")
  const rows = data.map((item: any) => Object.values(item).join(","))
  return [header, ...rows].join("\n")
}
export const handleDownloadCSV = (data: any) => {
  const csvData = convertToCSV(data)
  const blob = new Blob([csvData], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url
  a.download = "historical_data.csv"
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}

export const staticData = [
  {
    id: "1",
    name: "Open",
    value: "$148.11",
  },
  {
    id: "2",
    name: "High",
    value: "$169.20",
  },
  {
    id: "3",
    name: "Low",
    value: "119",
  },
  {
    id: "4",
    name: "Beta",
    value: "2.13",
  },
  {
    id: "5",
    name: "Alpha",
    value: "1.0",
  },
  {
    id: "6",
    name: "Volatility",
    value: "Low",
  },
  {
    id: "7",
    name: "Sharpe Ratio",
    value: "1.0",
  },
  {
    id: "8",
    name: "Avg Volume",
    value: "35,19 M",
  },
  {
    id: "9",
    name: "52 Wk high",
    value: "$149.20",
  },
  {
    id: "10",
    name: "52 Wk low",
    value: "$129.20",
  },
  {
    id: "11",
    name: "Market cap",
    value: "2.36T",
  },
  {
    id: "12",
    name: "P/e ratio",
    value: "24.23",
  },
  {
    id: "13",
    name: "Dividend Yield",
    value: "0.61",
  },
]

export const newsList = [
  {
    id: "1",
    descrpition:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs ",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
  {
    id: "2",
    descrpition: "3 Things About Apple That Smart Investors Know",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
  {
    id: "3",
    descrpition:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs ",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
  {
    id: "4",
    descrpition: "3 Things About Apple That Smart Investors Know",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
  {
    id: "5",
    descrpition:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs ",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
  {
    id: "6",
    descrpition: "3 Things About Apple That Smart Investors Know",
    time: "Altcoin • 50m ago",
    image: "/images/news/news-1.png",
  },
]

export const historicalData: HistoricalColumn[] = [
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
  {
    t: "Jun 19, 2023",
    c: "$180.57",
    o: "$177.895",
    v: "61,944,620",
    h: "$180.84",
    l: "$177.46",
  },
]

export const peopleBoughtData = [
  {
    id: 1,
    name: "GOOG",
    description: "Alphabet",
    image: "/icons/google.svg",
    change: "-1.53%",
  },
  {
    id: 2,
    name: "MSFT",
    description: "Microsoft",
    image: "/icons/google.svg",
    change: "-1.53%",
  },
  {
    id: 3,
    name: "AMZN",
    description: "Amazon.com Inc.",
    image: "/icons/google.svg",
    change: "+1.53%",
  },
  {
    id: 4,
    name: "KO",
    description: "Coca-Cola",
    image: "/icons/google.svg",
    change: "+1.53%",
  },
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
  {
    name: "CryptoWave",
    profileImage: "/images/community/doge.jpeg",
    username: "@satechainmedia",
    bluetick: true,
    detail:
      "A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney wh made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs A SmartMoney who made 1,219 $ETH ($2.2M) on $PEPE spent 1,173 $ETH ($BTC $PEPE again 14 hrs..",
    postImage: "/images/community/doge.jpeg",
    comment: 1,
    share: 1,
    like: 2,
  },
  {
    name: "BlockchainWhiz",
    profileImage: "/images/community/doge.jpeg",
    username: "@BlockchainWhiz",
    bluetick: true,
    detail:
      "$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K...$PEPE outperforms Bitcoin with 20% daily gains while $BTC remains stagnant at $27K......",
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
export const DrawerCardData = [
  {
    name: "Optimisium",
    profileImage: "/images/community/doge.jpeg",
    username: "@optimisium",
    bluetick: true,
    bearish: true,
    detail:
      "Mysterious Bitcoin Whale Awakens, Transfers Around $38 Million in Funds A long-dormant Bitcoin wallet, which held a significant sum of 1,432.93 bitcoins valued at $37.8 million, has recently transferred its funds to a new address.This move comes after more than a decade of inactivity, attracting attention within the cryptocurrency community. The wallet first received bitcoin back in April 2013, when the price per coin was a mere $195.40, as observed by on-chain analyst Lookonchain.This transfer is part of a series of similar movements witnessed in recent months, involving other long-idle addresses in the cryptocurrency space.Dormant wallet transfers $37.8 million worth of Bitcoin. After remaining inactive for over 10 years, a wallet containing a substantial amount of 1,432.93 bitcoins recently initiated a transfer to a new address. $BTC #Bitcoin #BTC",
    postImage: "/images/community/doge.jpeg",
    comment: 0,
    share: 0,
    like: 2,
  },
]

export const CommentData = [
  {
    name: "Optimisium",
    profileImage: "/images/community/doge.jpeg",
    username: "@optimisium",
    bluetick: true,
    bearish: true,
    detail:
      "Mysterious Bitcoin Whale Awakens, Transfers Around $38 Million in Funds A long-dormant Bitcoin wallet, which held a significant sum of 1,432.93 bitcoins valued at $37.8 million, has recently transferred its funds to a new address.This move comes after more than a decade of inactivity, attracting attention within the cryptocurrency community. The wallet first received bitcoin back in April 2013, when the price per coin was a mere $195.40, as observed by on-chain analyst Lookonchain.This transfer is part of a series of similar movements witnessed in recent months, involving other long-idle addresses in the cryptocurrency space.Dormant wallet transfers $37.8 million worth of Bitcoin. After remaining inactive for over 10 years, a wallet containing a substantial amount of 1,432.93 bitcoins recently initiated a transfer to a new address. $BTC #Bitcoin #BTC",
    comment: 0,
    share: 0,
    like: 2,
  },
]
export const RepostData = [
  {
    name: "Optimisium",
    profileImage: "/images/community/doge.jpeg",
    username: "@optimisium",
    bluetick: true,
    bearish: true,
    detail: "Repost",
    comment: 0,
    share: 0,
    like: 2,
  },
]

export const priceAlertData = [
  {
    id: 1,
    titleimage: "/images/market/apple.svg",
    title: "Apple APPL",
    option: [
      {
        id: 1,
        content: "Price increase on 10% / 1hr",
        dateCreated: "Created Today",
      },
      {
        id: 2,
        content: "Price drop on 10% / 1hr",
        dateCreated: "Created Jun 28, 2023",
      },
      {
        id: 3,
        content: "Target price $125.00 / 24hr",
        dateCreated: "Created Today",
      },
    ],
  },
  {
    id: 2,
    titleimage: "/images/market/tesla.svg",
    title: "Tesla TSLA",
    option: [
      {
        id: 1,
        content: "Price increase on 10% / 1hr",
        dateCreated: "Created Today",
      },
    ],
  },
]
