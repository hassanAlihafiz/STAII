import React from "react"
import Image from "next/image"
import { MoveUp, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
  item: {
    id?: number
    title: string
    keyPoints: {
      text: string
      icon: string
    }[]
    image: string
    rank?: number
    growth: number
    subscriptionPlan: string
  }
}
const RoboFundsCard = ({ item: fund }: Props) => {
  const rankStyles =
    fund.rank === 1
      ? {
          background: "rgba(255, 248, 221, 0.10)",
          color: "linear-gradient(0deg,#EAAC0C,#EAAC0C)",
          borderImage:
            "linear-gradient(222deg, #804d00, #a56900, #b97d00, #cd9200, #e0a700) ",
        }
      : fund.rank === 2
      ? {
          color: "linear-gradient(222deg, #CAC9C9, #C8C8C8, #636363)",
          background:
            "linear-gradient(222deg, rgba(220, 220, 220, 0.20) 0%, rgba(237, 237, 237, 0.20) 45.83%, rgba(99, 99, 99, 0.20) 100%)",
          borderImage:
            "linear-gradient(222deg, rgba(220, 220, 220, 0.20) 0%, rgba(237, 237, 237, 0.20) 45.83%, rgba(99, 99, 99, 0.20) 100%)",
        }
      : {
          background:
            "linear-gradient(216deg, rgba(132, 64, 1, 0.10) 0%, rgba(255, 199, 147, 0.10) 45.83%, rgba(79, 38, 1, 0.10) 100%)",
          color: "linear-gradient(216deg, #844001, #FFC793, #4F2601)",
          borderImage:
            "linear-gradient(216deg, rgba(132, 64, 1, 0.10) 0%, rgba(255, 199, 147, 0.10) 45.83%, rgba(79, 38, 1, 0.10) 100%)",
        }
  return (
    <div
      className={`w-[255px] max-w-[255px] overflow-hidden rounded-xl   bg-[#EDEEF3] p-4 dark:bg-[#202A41]`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="relative h-[32px] w-[32px] overflow-hidden rounded-full">
          <Image fill src={fund.image} alt="" />
        </div>
        {fund.rank && (
          <div
            className="overflow-hidden rounded-3xl border px-2 py-1 text-[10px]"
            style={rankStyles}
          >
            <span
              style={{
                background: rankStyles.color,
                display: "inline",
                backgroundImage: rankStyles.color,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Rank: #{fund.rank}
            </span>
          </div>
        )}
      </div>
      <div className={` flex w-full justify-between pt-8`}>
        <h4 className="max-h-10  overflow-hidden text-ellipsis text-sm font-medium  text-[#2B2D42] dark:text-white">
          {fund.title}
        </h4>
        <span className="flex items-center text-sm font-medium text-[#069D6E]">
          <MoveUp className="mr-1 text-inherit" size={14} />
          {fund.growth}%
        </span>
      </div>
      <ul className="w-full pt-4">
        {fund.keyPoints.map((point, index) => (
          <li
            key={index}
            className="mb-2 flex max-w-[160px] items-start justify-start text-xs font-medium text-[#6A7381] dark:text-[#D7DBE0]"
          >
            <div className="relative mr-2 h-[14px] w-[14px] ">
              <Image src={point.icon} fill alt="" />
            </div>
            {point.text}
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        size={"sm"}
        className="relative z-[1] mt-4 flex h-8 cursor-pointer items-center justify-center border border-[#C1F0DB] text-xs text-primary-foreground"
      >
        <Plus className="h-4 w-4 text-inherit" /> &nbsp; {fund.subscriptionPlan}
      </Button>
      <Image
        src={"/images/robo/bg-chart.svg"}
        alt=""
        className="absolute bottom-0
        right-0 z-0"
        width={255}
        height={188}
      />
    </div>
  )
}

export default RoboFundsCard

export const roboFundsCardRespnosiveness = {
  0: {
    spaceBetween: 12,
    slidesPerView: 1.5,
  },
  560: {
    spaceBetween: 12,
    slidesPerView: 2.1,
  },
  820: {
    spaceBetween: 12,
    slidesPerView: 3,
  },
}
