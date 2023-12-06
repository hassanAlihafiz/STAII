import Image from "next/image"
import {
  Activity,
  CandlestickChart,
  Coffee,
  HeartHandshake,
  Home,
  Lightbulb,
  Search,
  Siren,
  TrendingUp,
  Unlock,
} from "lucide-react"

export const primaryfinancialgoal = [
  {
    icon: () => <Coffee className="h-5 w-5" />,
    title: "Retirement",
    value: 0,
  },
  {
    icon: () => <Home className="h-5 w-5" />,
    title: "Saving for a home",
    value: 1,
  },
  {
    icon: () => <Image alt="" src="/icons/hat.svg" width={20} height={20} />,
    title: "Saving for education",
    value: 2,
  },
  {
    icon: () => <Siren className="h-5 w-5" />,
    title: "Building an emergency fund",
    value: 3,
  },
  {
    icon: () => (
      <Image alt="" src="/icons/piggy-bank.svg" width={20} height={20} />
    ),
    title: "General savings and investment",
    value: 4,
  },
]

export const investingexperience = [
  {
    title: "None",
    value: 0,
  },
  {
    title: "Limited experience",
    value: 1,
  },
  {
    title: "Moderate experience",
    value: 2,
  },
  {
    title: "Extensive experience",
    value: 3,
  },
]
export const dependents = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
]
export const investingDuration = [
  {
    title: "Less than 3 year",
    value: 0,
  },
  {
    title: "3-5 years",
    value: 1,
  },
  {
    title: "6-10 years",
    value: 2,
  },
  {
    title: "More than 10 years",
    value: 3,
  },
]
export const investmentRiskResponse = [
  {
    title: "Buy more investments at the lower price",
    value: 0,
  },
  {
    title: "Hold onto the investments and not make any changes",
    value: 1,
  },
  {
    title: "Sell some Investments",
    value: 2,
  },
  {
    title: "Sell all Investments immediately",
    value: 3,
  },
]

export const martialStatus = [
  {
    title: "Single",
    value: 0,
  },
  {
    title: "Married",
    value: 1,
  },
  {
    title: "Divorced",
    value: 2,
  },
  {
    title: "Widowed",
    value: 3,
  },
]

export const employmentStatus = [
  {
    title: "Employed",
    value: 0,
  },
  {
    title: "Unemployed",
    value: 1,
  },
  {
    title: "Retired",
    value: 2,
  },
  {
    title: "Student",
    value: 3,
  },
]

export const riskTolerance = [
  {
    title: "Low",
    value: 0,
  },
  {
    title: "Medium",
    value: 1,
  },
  {
    title: "High",
    value: 2,
  },
]

export const roboTraderFeatures = [
  {
    icon: () => <Lightbulb className="h-6 w-5 text-primary-foreground" />,
    title: "  Strategy creation",
    dark: true,
  },
  {
    icon: () => <TrendingUp className="h-6 w-5 text-primary-foreground" />,
    title: " Automated trading",
    dark: true,
  },
  {
    icon: () => <Activity className="h-6 w-5 text-primary-foreground" />,
    title: "Monthly Monitoring",
    dark: true,
  },
]

export const membershipFeatures = [
  {
    icon: () => <Search className="h-6 w-5 text-primary-foreground" />,
    title: "  Monthly analyzing to ensure you over or under invest",
  },
  {
    icon: () => (
      <CandlestickChart className="h-6 w-5 text-primary-foreground" />
    ),
    title: "   RoboTrader daily trading of your entire portfolio",
  },
  {
    icon: () => <Unlock className="h-6 w-5 text-primary-foreground" />,
    title: "Access to news and insights about stocks",
  },
]

export const communityFeatures = [
  {
    icon: () => <Image src="/icons/trader.svg" alt="" width={24} height={24} />,
    title: "Take a look at popular traders and follow their orders",
    dark: true,
  },
  {
    icon: () => <HeartHandshake className="h-6 w-5 text-primary-foreground" />,
    title: " Share and get insights from the community",
    dark: true,
  },
]

export const CommunityChannels = [
  {
    imageUrl: "/images/community/1.svg",
    title: "English trading",
    description:
      "Maximize your profits and minimize your risks with our expert trading advice and analysis.",
    followers: "1.2k",
  },
  {
    imageUrl: "/images/community/2.svg",
    title: "trade Zone",
    description:
      "Experience the power of collective trading. Join our community",
    followers: "18.2k",
  },
  {
    imageUrl: "/images/community/3.svg",
    title: "MarketMaven",
    description:
      "Want to learn how to trade like a pro? Our trading channel offers ",
    followers: "15.8k",
  },
  {
    imageUrl: "/images/community/4.svg",
    title: "Trading Titans",
    description: "Don't let market volatility hold you back. ",
    followers: "9.2k",
  },
  {
    imageUrl: "/images/community/5.svg",
    title: "Wealth Wave",
    description: "Join our community of traders and investors",
    followers: "5.2k",
  },
  {
    imageUrl: "/images/community/1.svg",
    title: "English trading",
    description:
      "Maximize your profits and minimize your risks with our expert trading advice and analysis.",
    followers: "1.2k",
  },
  {
    imageUrl: "/images/community/2.svg",
    title: "trade Zone",
    description:
      "Experience the power of collective trading. Join our community",
    followers: "18.2k",
  },
  {
    imageUrl: "/images/community/3.svg",
    title: "MarketMaven",
    description:
      "Want to learn how to trade like a pro? Our trading channel offers ",
    followers: "15.8k",
  },
  {
    imageUrl: "/images/community/4.svg",
    title: "Trading Titans",
    description: "Don't let market volatility hold you back. ",
    followers: "9.2k",
  },
  {
    imageUrl: "/images/community/5.svg",
    title: "Wealth Wave",
    description: "Join our community of traders and investors",
    followers: "5.2k",
  },
]
