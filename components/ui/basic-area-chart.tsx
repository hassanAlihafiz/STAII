"use client"

import React, { useEffect, useState } from "react"
import { Area } from "@ant-design/plots"

interface BasicAreaChart {
  data: any[]
}

const BasicAreaChart: React.FC<BasicAreaChart> = ({ data }) => {
  const config = {
    data: data,
    xField: "t",
    yField: "h",
    xAxis: {
      range: [0, 1],
      tickCount: 10,
      grid: {
        line: {
          style: {
            width: 1,
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
            width: 1,
            stroke: "#F9F9F9",
          },
        },
      },
    },
    line: {
      color: "#14A93D",
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#14A93D 1:#14A93D",
      }
    },
  }
  return <Area {...config} />
}

export default BasicAreaChart
