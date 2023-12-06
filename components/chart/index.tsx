import React from "react"
import { formatTimestamp, generateStockData } from "@/utils/stock-data"
import { ChevronRight } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import ChartTimeBar from "./chart-time-bar"

interface CharComponentProps {
  data: any
}
const ChartComponent: React.FC<CharComponentProps> = ({ data }) => {
  return (
    <>
      <div className="mb-4 max-w-[744px]">
        <AreaChart
          height={315}
          width={814}
          className="h-[177px]! w-full"
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            // type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={formatTimestamp}
          />
          <YAxis orientation="right" />
          {/* <Tooltip /> */}

          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop stop-color="#14A93D" />
              <stop offset="1" stop-color="#14A93D" stop-opacity="0" />

              {/* <stop offset="10%" stopColor="#F2FAF4" />
              <stop offset="100%" stopColor="#F8FCF9" /> */}
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="price"
            stackId="1"
            stroke="white"
            fill="white"
            className="dark:hidden"
          />

          <Area
            dataKey="net_amount"
            stroke="#069D6E"
            fill="url(#gradientFill)"
            dot={false} // Disable dots along the line
            strokeWidth={2} // Adjust line thickness as needed
            stackId={"1"}
          />
        </AreaChart>
      </div>
      <ChartTimeBar />
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[rgba(156, 165, 175, 1)] text-sm font-medium capitalize dark:text-white">
          Withdraw/Buying Power
        </p>
        <span className="mx-4 flex h-[1px] w-4/5 flex-1 bg-[#F4F5FA] dark:bg-[#2D374E]" />
        <p className="text-[rgba(42, 48, 51, 1)] flex cursor-pointer items-center text-sm font-medium dark:text-white">
          $100.11{" "}
          <ChevronRight className="text-[rgba(106, 115, 129, 1)] ml-4 h-5 w-5" />
        </p>
      </div>
    </>
  )
}

export default ChartComponent
