import React from "react"
import Image from "next/image"
import { MoveUp } from "lucide-react"
import { CommunityData } from "@/types/community"

interface Props {
  item: CommunityData & {
    price: number
    priceChanged: number
  }
}
const StockSliderCard = ({ item: stock }: Props) => {
  const isPositive = stock.priceChanged > 0
  return (
    <div
      className={`flex h-[146px] w-[104px] max-w-[103px] flex-col items-start overflow-hidden rounded-xl p-4   ${
        isPositive
          ? "bg-[#ECFDF5] dark:bg-[#1E3E34] "
          : "bg-[#FEF2F2] dark:bg-[#542D28]"
      } `}
    >
      <div className="relative mb-3 mr-auto aspect-square h-[25px]">
        <Image
          fill
          src={stock.community?.icon || "/images/logo-icon.svg"}
          alt=""
        />
      </div>
      <h5 className="text-xs font-medium text-[#6A7381] dark:text-[#D7DBE0]">
        {stock.community?.name}
      </h5>
      <div className="font-semiBold text-base text-[#2A3033] dark:text-white">
        {stock.price}
      </div>
      <div
        className="mt-1 flex w-full  items-center justify-start text-sm font-medium"
        style={{
          color: isPositive ? "#069D6E" : "#EA1717",
        }}
      >
        {isPositive ? (
          <MoveUp className="-ml-1 mr-1 w-3 text-inherit" />
        ) : (
          <MoveUp className="-ml-1 mr-1 w-3 rotate-180 text-inherit" />
        )}
        {stock.priceChanged}%
      </div>
    </div>
  )
}

export default StockSliderCard

export const stockSliderCardRespnosiveness = {
  0: {
    spaceBetween: 12,
    slidesPerView: 3.5,
  },
  500: {
    spaceBetween: 12,
    slidesPerView: 4.5,
  },
  960: {
    spaceBetween: 12,
    slidesPerView: 7,
  },
}
