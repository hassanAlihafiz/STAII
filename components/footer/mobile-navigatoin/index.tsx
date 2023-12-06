"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { toggleRedirectModal } from "@/store/slices/app-slice"
import { useDispatch } from "react-redux"

import { MvpNavigationLinks, NavigationLinks } from "@/config/site"

const MobileNavigation = ({ isMvp = false }: { isMvp?: boolean }) => {
  const pathname = usePathname()
  const router = useRouter()
  const Links = isMvp ? MvpNavigationLinks : NavigationLinks
  const dispatch = useDispatch()
  const user = useAppSelector(
    (state) => state?.user?.profile?.investment_accomodation
  )
  console.log(isMvp)
  return (
    <div className="flex w-full pt-4 lg:hidden items-center justify-evenly pb-4 border-t border-t-[#EDEEF3] dark:border-t-[#2D3A43]  dark:bg-[#2D374E] fixed bottom-0 z-10 bg-white">
      {Links?.map((link, i) => {
        if (link.name === "RoboAnalyzer") return null
        return (
          <Link
            href={
              link.name === "Trading Platform" || link.name === "RoboAnalyzer"
                ? "undefined"
                : link.href[0]
            }
            onClick={(e) => {
              if (link.name === "Trading Platform") {
                e.preventDefault()
                dispatch(toggleRedirectModal(true))
              } else if (link.name === "RoboAnalyzer") {
                e.preventDefault()
                user?.investment_strategy === undefined
                  ? router.push("/robo-analyzer/financial-goal")
                  : router.push("/robo-analyzer/investment-recommendation")
              }
            }}
            className={`flex flex-col items-center justify-center text-[#9CA5AF] ${
              link.href.includes(pathname) &&
              "text-primary-foreground dark:text-white"
            }`}
            key={i}
          >
            {link.icon()}
            <span className="text-xs font-semibold text-inherit mt-2 transition-colors duration-100">
              {link.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export default MobileNavigation
