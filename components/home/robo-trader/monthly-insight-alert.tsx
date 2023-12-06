import React from "react"
import Image from "next/image"

interface AlertProps {
  description: String
}
const RoboTraderMonthlyInsightAlert: React.FC<AlertProps> = ({
  description,
}) => {
  return (
    <div className="relative my-5 flex h-24 w-full cursor-pointer items-center justify-start rounded-xl bg-[#E2F8F0] p-6 dark:bg-gradient-to-b dark:from-[#284A3F]  dark:via-[#284A3F] dark:to-[#284A3F] ">
      <div className=" relative grid aspect-square h-12 place-items-center rounded-full bg-[#92CFC4]">
        <span className="absolute right-3 top-3 block h-2 w-2 rounded-full bg-destructive"></span>
        <Image src="/images/logo-icon.svg" width={20} height={20} alt="" />
      </div>
      <div className="ml-4 flex flex-col items-start">
        <h4 className="text-sm font-semibold text-brand-gray-80 dark:text-white">
          RoboTrader monthly report
        </h4>
        <p className="my-1 text-xs font-medium text-brand-gray-80 dark:text-brand-gray-30">
          {description}
        </p>
        <span className="text-xs text-brand-gray-50">See 10 more messages</span>
      </div>
      <div className="absolute left-2 -z-10 h-full w-[98%] translate-y-2 rounded-xl bg-[#DDEDE7] dark:bg-[#122821]" />
    </div>
  )
}

export default RoboTraderMonthlyInsightAlert
