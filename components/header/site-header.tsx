"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { toggleRedirectModal } from "@/store/slices/app-slice"
import { Star } from "lucide-react"
import { useDispatch } from "react-redux"

import { MvpNavigationLinks, NavigationLinks } from "@/config/site"

import NotificationDrawer from "../drawer/notification-drawer"
import { SearchModal } from "../modal/search-modal"
import ProfileDropDown from "./auth-header/profile-dropdown"
import Logo from "./logo"

export function SiteHeader({ isMvp = false }: { isMvp?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const Links = isMvp ? MvpNavigationLinks : NavigationLinks
  const dispatch = useDispatch()
  const user = useAppSelector(
    (state) => state?.user?.profile?.investment_accomodation
  )
  return (
    <header className="hidden md:flex lg:mb-0  h-16 max-w-full items-center  sm:justify-between sm:space-x-0 z-[1px] relative">
      <nav className="container flex h-full  items-center flex-row-reverse lg:flex-row justify-between">
        <div className="hidden lg:inline-block w-fit h-fit">
          <Logo />
        </div>
        <ul className="hidden lg:flex ml-14 mr-auto  h-full items-center">
          {Links.map((link, i) => (
            <li
              className={`relative mx-2 grid h-full place-items-center px-2`}
              key={i}
            >
              <Link
                href={
                  link.name === "Trading Platform" ||
                  link.name === "RoboAnalyzer"
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
                className={`font-medium capitalize text-[#2A3033] dark:text-white ${
                  !link.href.includes(pathname) &&
                  "text-[#6A7381] dark:text-[#D7DBE0]"
                }`}
              >
                {link.name}
              </Link>

              <span
                className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2  bg-primary-foreground transition-all duration-300 "
                style={
                  link.href.includes(pathname)
                    ? { width: "100%" }
                    : { width: "0" }
                }
              />
            </li>
          ))}
        </ul>
        <div className="hidden w-2/5 justify-evenly lg:w-fit lg:flex items-center lg:mx-8">
          <SearchModal />
          <NotificationDrawer />
          <Star className="mx-2 cursor-pointer text-primary-foreground" />
        </div>
        <ProfileDropDown />
      </nav>
      {/* </div> */}
    </header>
  )
}
