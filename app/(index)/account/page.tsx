"use client"

import React, { useState } from "react"
import { useAppSelector } from "@/store"

import AccountApp from "@/components/account/app"
import AccountDeletion from "@/components/account/deletion"
import AccountHeader from "@/components/account/header"
import AccountHelpCenter from "@/components/account/help-center"
import AccountHistory from "@/components/account/history"
import AccountInvesting from "@/components/account/investing"
import AccountLogout from "@/components/account/logout"
import AccountPersonalInfo from "@/components/account/personal-info"
import AccountRate from "@/components/account/rate"
import AccountSecurity from "@/components/account/security"
import AccountSubscriptions from "@/components/account/subscription"
import AccountDocument from "@/components/account/upload-document"
import RoboTraderMonthlyInsightAlert from "@/components/home/robo-trader/monthly-insight-alert"

const AccountPage = () => {
  const [selectedImage, setSelectedImage] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const profile = useAppSelector((state) => state.user?.profile)

  return (
    <main className="w-full max-w-[770px] m-[auto] pb-[70px] mt-11 flex flex-col overflow-hidden ">
      <div className="w-full">
        <AccountHeader profile={profile} />
      </div>
      <div className="px-[20px] md:px-0">
        <div className="w-full mt-[30px]">
          <AccountInvesting />
        </div>
        <div className="w-full mt-[20px]">
          <RoboTraderMonthlyInsightAlert description="See important portfolios’ insights" />
        </div>
        <div className="w-full mt-[30px]">
          <AccountPersonalInfo
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setProfileImage={setProfileImage}
            profile={profile}
          />
        </div>

        <AccountSubscriptions />

        <AccountDocument />

        <AccountSecurity />

        <AccountApp />

        <AccountHistory />

        <AccountHelpCenter />

        <AccountDeletion />

        <AccountRate />

        <AccountLogout />
      </div>
    </main>
  )
}

export default AccountPage
