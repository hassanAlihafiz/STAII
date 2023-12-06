import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { CandlestickChart, Maximize2, TrendingUp } from "lucide-react"

const timeOptions = [
  {
    label: "1D",
    value: "1D",
  },
  {
    label: "1W",
    value: "1W",
  },
  {
    label: "1M",
    value: "1M",
  },
  {
    label: "3M",
    value: "3M",
  },
  {
    label: "1Y",
    value: "1Y",
  },
]

interface chartTimeFrameProps {
  showTrendIcon?: boolean
  showMaxIcon?: boolean
  showGraph?: boolean
  setShowGraph?: (time: boolean) => void
  activeTime: any
  setActiveTime: (time: string) => void
}

const ChartTimeFrame: React.FC<chartTimeFrameProps> = ({
  showTrendIcon,
  showMaxIcon,
  activeTime,
  setActiveTime,
  showGraph,
  setShowGraph,
}) => {
  const router = useRouter()
  return (
    <div className="flex gap-3 justify-center items-center">
      {showTrendIcon && (
        <div
          onClick={() => {
            if (setShowGraph) {
              setShowGraph(!showGraph)
            }
          }}
          className={`flex  justify-center items-center h-[39px] w-[50px] cursor-pointer bg-[#F4F5FA] dark:bg-brand-blue-90 hover:bg-white hover:shadow-day text-xs font-semibold uppercase rounded-md transition duration-200  hover:dark:bg-brand-gray-70 dark:text-brand-gray-50 hover:dark:!text-white px-1 py-2 ${
            !showGraph &&
            "bg-white  shadow-day dark:bg-brand-gray-70 dark:!text-white"
          }`}
        >
          {showGraph ? (
            <TrendingUp size={20} strokeWidth={2} color="green" />
          ) : (
            <CandlestickChart size={20} strokeWidth={2} color="green" />
          )}
        </div>
      )}
      <div className="w-full bg-[#F4F5FA] dark:bg-brand-blue-90 flex items-center rounded-lg ring-1 ring-white dark:ring-brand-gray-70 p-1 my-3 lg:my-6">
        {timeOptions.map((time, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (setActiveTime) {
                setActiveTime(time?.value)
              }
            }}
            type="button"
            className={`flex-1 hover:bg-white hover:shadow-day text-xs font-semibold uppercase rounded-md transition duration-200  hover:dark:bg-brand-gray-70 dark:text-brand-gray-50 hover:dark:!text-white px-1 py-2 ${
              activeTime === time?.value &&
              "bg-white  shadow-day dark:bg-brand-gray-70 dark:!text-white"
            }`}
          >
            {time?.label}
          </button>
        ))}
      </div>
      {showMaxIcon && (
        <div className="flex  justify-center items-center h-[39px] w-[50px] cursor-pointer bg-[#F4F5FA] dark:bg-brand-blue-90 hover:bg-white hover:shadow-day text-xs font-semibold uppercase rounded-md transition duration-200  hover:dark:bg-brand-gray-70 dark:text-brand-gray-50 hover:dark:!text-white px-1 py-2">
          <Maximize2 size={20} strokeWidth={1} />
        </div>
      )}
    </div>
  )
}

export default ChartTimeFrame
