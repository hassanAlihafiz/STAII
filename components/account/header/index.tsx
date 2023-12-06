"use client"

import React from "react"
import Link from "next/link"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"

interface CropsProps {
  profile: any
}

const AccountHeader: React.FC<CropsProps> = ({ profile }) => {
  return (
    <div className="border-b-2 border-brand-gray-20 dark:border-brand-gray-80 pb-[25px]">
      <div className="mb-3.5 px-[20px] md:px-0">
        <h1 className="black-600 text-[27px] dark:text-white">Account</h1>
      </div>
      <div className="md:flex-center-between">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-[72px] h-[72px] rounded-[50%] md:mr-2.5">
            <img
              src={
                profile?.profile_url
                  ? profile?.profile_url
                  : "/icons/account-avatar.svg"
              }
              alt="user"
              className="object-cover w-full h-full rounded-[50%] cursor-pointer"
              width={72}
              height={72}
            />
          </div>
          <div className="flex flex-col-reverse items-center justify-center md:inline">
            <p className="md:hidden black-sm-500 dark:text-brand-gray-30 mt-[8px]">
              Total in SocialTrader.AI
            </p>
            <h2 className="black-600 text-[40px] md:text-[32px] leading-10 dark:text-white">
              $96,656.32
            </h2>
            <p className="black-sm-500 dark:text-brand-gray-30 mb-[25px] mt-[15px] md:my-0">
              {" "}
              @{profile?.name}
            </p>
          </div>
        </div>
        <div>
          <Link href="/transfer">
            <Button className="hidden md:inline w-[105px] h-[50px] border border-brand-green-40 rounded-[10px] font-[550] capitalize tracking-[1px] dark:border-brand-dark-bg">
              Transfer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AccountHeader
