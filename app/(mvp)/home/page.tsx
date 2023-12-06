"use client"

import { useAppSelector } from "@/store"
import { watchlist, yourTopPerformers } from "@/utils/home"

import { UserProfile } from "@/components/header/auth-header/profile-dropdown"
import NewsSection from "@/components/home/news"
import UserSSOModal from "@/components/modal/ib-modal/sso-modal"
import PerformerList from "@/components/portfolio/performers/performers-list"
import Watchlist from "@/components/watchlist/watchlist"

export default function IndexPage() {
  const ibProfile = useAppSelector((state) => state.user.ibAccount)
  return (
    <main className="container px-5 lg:px-4 lg:mt-10 flex overflow-hidden">
      <div className="lg:my-6 lg:mr-4 flex w-full xl:max-w-[798px]  flex-1 flex-col lg:px-2">
        <div className="lg:hidden flex items-center mt-9 mb-2">
          <UserProfile />
        </div>
        {/* <h1 className="text-2xl md:text-3xl font-semibold text-[#2A3033] dark:text-white">
          Your Trading Account User: {ibProfile?.username}
        </h1> */}
        <div className="mt-10 mb-4 ">
          <UserSSOModal name={"Home"} />
        </div>

        <div className="block xl:hidden">
          <PerformerList list={yourTopPerformers} />
        </div>
        <NewsSection />
      </div>
      <div className="max-h-[800px] hidden xl:block min-w-[378px] max-w-[378px] rounded-xl shadow-md dark:border dark:border-[#3E4856] dark:bg-[#202A41]">
        <PerformerList list={yourTopPerformers} />
        <hr className="mx-auto w-11/12 bg-[#EDEEF3] dark:border-[#3E4856] dark:bg-[#3E4856] " />
        <Watchlist list={watchlist} />
      </div>
    </main>
  )
}
