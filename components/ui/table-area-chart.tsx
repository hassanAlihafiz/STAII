"use client"

import React from "react"
import dynamic from "next/dynamic"

const DynamicChart = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Area),
  {
    ssr: false, // Disable server-side rendering for this component
  }
)

interface TableAreaChartProps {
  data: {
    timePeriod: string
    value: number
  }[]
}

export const TableAreaChart = ({ data }: TableAreaChartProps) => {
  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    color: "#069D6E",
    smooth: true,

    line: {
      size: 2,
    },
    areaStyle: {
      opacity: 0,
      fill: "#069D7A0D",
    },
    xAxis: {
      label: false,
      line: false,
    },
    yAxis: {
      grid: {
        line: false,
      },
      label: false,
    },
    annotations: [
      {
        type: "regionFilter",
        end: ["max", "4"],
        color: "#DC2626",
      },
    ],
  }
  //@ts-ignore
  return <DynamicChart {...config} />
}
