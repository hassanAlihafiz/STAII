"use client"

import React from "react"
import { usePathname } from "next/navigation"

import MarketNavHeader from "@/components/market/nav-header"

const MarketLayout = ({ children }: { children: React.ReactElement }) => {
  const pathname = usePathname()

  const isNavbarHide = [
    "/market/robo-analyzer",
    "/market/robofunds/subscribtion",
  ]
  const ShouldHideNavbar = isNavbarHide.includes(pathname)
  return (
    <section className="w-full px-4 max-w-[1200px] mx-auto pt-10 max-md:px-0 max-md:pt-5">
      {!ShouldHideNavbar && <MarketNavHeader />}
      {children}
    </section>
  )
}

export default MarketLayout
