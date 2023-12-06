"use client"

import React from "react"
import Link from "next/link"
import { saveAs } from "file-saver"

import "@/styles/common-page.css"
import { roboTrader } from "@/utils/portifolio"
import { ArrowLeftCircle, DownloadCloud } from "lucide-react"

import BackBtn from "@/components/ui/back-button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Table from "@/components/trading-activity/table"

const TradingActivity = () => {
  const rowOptions = [
    { id: 1, label: "10", value: "10" },
    { id: 2, label: "20", value: "20" },
    { id: 3, label: "30", value: "30" },
    { id: 4, label: "40", value: "40" },
  ]

  const handleDownloadCSV = () => {
    const csvData: any = roboTrader

    const blob = new Blob([csvData], { type: "text/csv;charset=UTF-8" })
    saveAs(blob, "trading_activity.csv")
  }

  return (
    <div className="w-full max-w-[650px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="z-10">
        {"  "}
        <div className="max-md:hidden">
          <BackBtn />
        </div>
        <div className="md:hidden flex items-center justify-between pt-10 pl-3 pr-8">
          <Link href="/account">
            <div>
              <ArrowLeftCircle
                strokeWidth={"0.5px"}
                size={"35px"}
                className="stroke-brand-gray-50 dark:fill-brand-gray-70"
              />
            </div>
          </Link>
          <div>
            <h1 className="black-600 text-base text-center leading-6 dark:text-white">
              Trading activity
            </h1>
          </div>
          <div></div>
        </div>
        <div className="max-md:hidden mt-3 ">
          <h1 className="black-600 text-2xl leading-10 dark:text-white">
            Trading activity
          </h1>
        </div>
        <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow  max-md:!pt-0 max-md:!mt-0">
          <div className="flex-center-between max-md:hidden">
            <div className="flex items-center gap-5">
              <div>
                <h3 className="text-sm text-brand-gray-60 font-normal">
                  Show Rows{" "}
                </h3>
              </div>
              <div className="w-24  h-10">
                <Select>
                  <SelectTrigger className="w-36 h-10 !rounded-xl cursor-pointer">
                    <SelectValue placeholder="Show Rows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {rowOptions.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center rounded-xl text-sm font-semibold ring-1 ring-brand-green-40 bg-brand-green-20 px-5 py-2.5 text-brand-green-70 hover:ring-brand-green-70 transition duration-200 space-x-2"
              >
                <DownloadCloud size={22} className="stroke-brand-gray-100" />
                <span className="text-brand-green-70 text-sm font-medium">
                  Download in CSV
                </span>
              </button>
            </div>
          </div>
          <Table data={roboTrader} />
        </div>
      </div>
    </div>
  )
}
export default TradingActivity
