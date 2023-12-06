import { ReactElement } from "react"
import {
  BarChart2,
  Bot,
  Briefcase,
  Home,
  MessageSquare,
  User2,
} from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "SocialTrader",
  description:
    "SocialTrader, the advanced investment platform that combines AI, social learning, and robust security.",
  rights: "SocialTrader, 2023 All Rights Reserved",
  footerNav: [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      title: "Terms of Service",
      href: "/terms-of-service",
    },
    {
      title: "Contact Us",
      href: "mailto:support@socialtrader.ai",
    },
    {
      title: "Disclosures",
      href: "/disclosures",
    },
  ],
  links: {
    twitter: "https://twitter.com/socialtraderai",
    instagram: "https://www.instagram.com/socialtrader.ai/",
    threads: "https://www.threads.net/@socialtrader.ai",
    tiktok: "https://www.tiktok.com/@socialtrader.ai",
    discord: "https://discord.gg/SocialTrader",
  },
}
interface NavItem {
  name: string
  href: string[]
  icon: () => ReactElement
}

export const NavigationLinks: NavItem[] = [
  {
    name: "Home",
    href: ["/"],
    icon: () => (
      <Home className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "RoboAnalyzer",
    href: [
      "/robo-analyzer/financial-goal",
      "/robo-analyzer/annual-income",
      "/robo-analyzer/monthly-expenses",
      "/robo-analyzer/net-worth",
      "/robo-analyzer/investing-experience",
      "/robo-analyzer/investing-duration",
      "/robo-analyzer/risk-tolerance",
      "/robo-analyzer/investment-loss",
      "/robo-analyzer/martial-status",
      "/robo-analyzer/employment-status",
      "/robo-analyzer/dependents",
      "/robo-analyzer/analyze",
      "/robo-analyzer/investment-recommendation",
    ],
    icon: () => <Bot className="text-inherit transition-colors duration-100" />,
  },
  {
    name: "Portfolio",
    href: ["/portfolio"],
    icon: () => (
      <Briefcase className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Markets",
    href: ["/market/assets", "script/:slug"],
    icon: () => (
      <BarChart2 className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Community",
    href: [
      "/community",
      "/community/following",
      "/community/watchlist",
      "/community/learning",
      "/community/:path",
    ],
    icon: () => (
      <MessageSquare className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Account",
    href: ["/account"],
    icon: () => (
      <User2 className="text-inherit transition-colors duration-100" />
    ),
  },
]

export const MvpNavigationLinks: NavItem[] = [
  {
    name: "Home",
    href: ["/home"],
    icon: () => (
      <Home className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "RoboAnalyzer",
    href: [
      "/robo-analyzer/financial-goal",
      "/robo-analyzer/annual-income",
      "/robo-analyzer/monthly-expenses",
      "/robo-analyzer/net-worth",
      "/robo-analyzer/investing-experience",
      "/robo-analyzer/investing-duration",
      "/robo-analyzer/risk-tolerance",
      "/robo-analyzer/investment-loss",
      "/robo-analyzer/martial-status",
      "/robo-analyzer/employment-status",
      "/robo-analyzer/dependents",
      "/robo-analyzer/analyze",
      "/robo-analyzer/investment-recommendation",
    ],
    icon: () => (
      <Briefcase className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Trading Platform",
    href: ["/trading-plateform"],
    icon: () => (
      <BarChart2 className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Transfer",
    href: ["/transfer"],
    icon: () => (
      <BarChart2 className="text-inherit transition-colors duration-100" />
    ),
  },
  {
    name: "Account",
    href: ["/account"],
    icon: () => (
      <User2 className="text-inherit transition-colors duration-100" />
    ),
  },
]
