import React, { useState } from "react"

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
    label: "YTD",
    value: "YTD",
  },
  {
    label: "1Y",
    value: "1Y",
  },
  {
    label: "ALL",
    value: "ALL",
  },
]

const ChartTimeBar = () => {
  const [selectedDuration, setSelectedDuration] = useState(
    timeOptions[0]?.value
  )
  return (
    <div className="my-2 flex h-[36px] w-full items-center rounded-xl bg-[#F4F5FA] p-1 dark:bg-[#2D374E]">
      {timeOptions.map((item, i) => {
        return (
          <div
            onClick={() => setSelectedDuration(item.value)}
            className={`flex h-full w-2 flex-1 cursor-pointer items-center justify-center rounded-lg bg-transparent text-base font-semibold transition-all duration-300 ${
              selectedDuration === item.value
                ? "bg-white text-[#2A3033] dark:bg-[#4B5563] dark:text-white"
                : " text-[#6A7381] dark:text-[#9CA5AF]"
            }`}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default ChartTimeBar
