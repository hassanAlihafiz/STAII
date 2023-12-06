import React, { useEffect, useState } from "react"
import { Stock } from "@ant-design/plots"

interface CustomStockConfig {
  data: any
  xField: string
  yField: [string, string, string, string]
  xAxis: any
  yAxis: any
  fallingFill: string
  risingFill: string
}

interface StockDataItem {
  close: number
  high: number
  low: number
  open: number
  trade_date: string
}

interface StockChartProps {
  data: any[]
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const config: CustomStockConfig = {
    data,
    xField: "t",
    yField: ["o", "c", "h", "l"],
    xAxis: {
      grid: {
        line: {
          style: {
            width: 0.5,
            stroke: "#F9F9F9",
          },
        },
      },
    },
    yAxis: {
      position: "right" as "right",
      grid: {
        line: {
          style: {
            width: 0.5,
            stroke: "#F9F9F9",
          },
        },
      },
    },
    fallingFill: "#D90429",
    risingFill: "#14A93D",
  }

  return <Stock {...config} />
}

export default StockChart
