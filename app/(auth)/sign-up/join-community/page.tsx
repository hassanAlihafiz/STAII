"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { CommunityChannels } from "@/utils/onboarding"

import { Button } from "@/components/ui/button"
import BackButton from "@/components/auth/onboarding/back-btn"
import ListCommunities from "@/components/community/list"

interface CommunityLiProps {
  channel: {
    title: string
    imageUrl: string
    description: string
    followers: string
  }
  lastOne?: boolean
}
const CommunityList = ({ channel, lastOne }: CommunityLiProps) => {
  const [following, setFollowing] = useState(false)
  return (
    <div
      className={`flex items-start justify-between border-[#F4F5FA]  py-[18px] dark:border-[#3E4856] ${
        !lastOne && "border-b"
      }`}
    >
      <div className="relative mt-1 flex aspect-square h-10 items-center justify-center overflow-hidden rounded-full bg-primary">
        <Image src={channel.imageUrl} alt="" fill />
      </div>
      <div className="ml-4 flex max-w-[66%] flex-col">
        <h3 className="text-sm font-medium capitalize text-[#2A3033] dark:text-white">
          {channel.title}
        </h3>
        <p className="my-1 text-[11px] text-[#575773] dark:text-[#D7DBE0]">
          {channel.description}
        </p>
        <span className="text-xs font-medium text-[#575773] dark:text-[#D7DBE0]">
          {channel.followers} followers
        </span>
      </div>
      <Button
        variant={following ? "outline" : "ghost"}
        size={"sm"}
        className={`ml-auto  mt-1 max-w-[96px] font-medium capitalize ${
          following && "text-[#3E4856] hover:text-[#3E4856] dark:bg-white"
        }`}
        onClick={() => setFollowing((prev) => !prev)}
      >
        {following ? "following" : "Follow"}
      </Button>
    </div>
  )
}
const RiskTolerance = () => {

  const router = useRouter()
  const handleClick = (title: string) => {
    router.push("/home")
  }
  return (
    <section className="form-container ">
      <BackButton />

      <h1 className="form-title">Interact with the trading community</h1>
      <p className="form-text mb-2 font-semibold ">Default channel</p>
      <div className="chanels-container pb-20 lg:pb-0 lg:max-h-[446px]  w-full overflow-y-auto">
        <ListCommunities isVisible />
      </div>
      <div className="mt-2 w-full border-t  border-[#F4F5FA] pt-4 dark:border-[#3E4856] form-bottom-section">
        <Button onClick={() => handleClick("Conservative")}>
          Get Start Investing
        </Button>
      </div>
    </section>
  )
}

export default RiskTolerance
