"use client"

import React from "react"
import { Bullet } from "@ant-design/plots"

export default function TableRangeLine({ values }: any) {
  const data = [
    {
      title: "table-range-line",
      ...values,
    },
  ]
  const config = {
    data,
    tooltip: false,
    autoFit: true,
    measureField: "measures",
    rangeField: "ranges",
    targetField: "target",
    xField: "title",
    color: {
      range: "#EAEAEC",
      measure: ["#EAEAEC", "#3A16C9"],
      target: "#3A16C9",
    },
    shapeStyle: {
      fill: "red",
    },
    label: {
      range: false,
      measure: false,
      target: false,
    },
    size: {
      range: 3,
      measure: 3,
      target: 10,
    },
    bulletStyle: {
      target: {
        lineWidth: 3,
      },
    },
    xAxis: {
      label: false,
      line: null,
      grid: {
        line: false,
      },
    },

    yAxis: {
      label: false,
      grid: {
        line: false,
      },
      // tickMethod: ({ max }: any) => {
      //   const interval = Math.ceil(max / 5)

      //   return [0, interval, interval * 2, interval * 3, interval * 4, max]
      // },
    },
  }

  return (
    <>
      <div className="flex justify-between text-sm">
        <div className="text-brand-gray-60 text-sm dark:text-brand-gray-40">
          {values?.ranges[0]}
        </div>
        <div className="text-brand-gray-60 text-sm dark:text-brand-gray-40">
          {values?.ranges[1]}
        </div>
      </div>
      {/*@ts-ignore*/}
      <Bullet {...config} />
    </>
  )
}
