"use client"

import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "@/styles/common-page.css"
import { useParams } from "next/navigation"
import { getAssetBarSymbol } from "@/async-functions/alpaca/assets"
import { calculateDate } from "@/async-functions/date-calculate"
import { useAppSelector } from "@/store"
import { HistoricalDataColumns } from "@/utils/historical-columns"
import { handleDownloadCSV } from "@/utils/specific-asset"
import { DownloadCloud, Loader2 } from "lucide-react"
import moment from "moment"

import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { StackTable } from "@/components/ui/stack-table"
import ChartTimeFrame from "@/components/chart/TimeFrame"
import HistoricalMobileView from "@/components/market/specific-asset/historical-mobile-view"

const SpecificHistoricalData = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState([0])
  const [activeTimeFrame, setActiveTimeFrame] = useState("1Day")
  const startDate = "2022-01-01"
  const token = useAppSelector((state) => state?.user?.token)
  const rowOptions = [
    { id: 1, label: "10", value: "10" },
    { id: 2, label: "20", value: "20" },
    { id: 3, label: "30", value: "30" },
    { id: 4, label: "40", value: "40" },
  ]
  const handleSelectChange = (event: any) => {
    setSelectedItems(event.value)
  }
  const getHistoricalData = () => {
    setIsLoading(true)
    getAssetBarSymbol(
      params?.name?.toUpperCase(),
      token!,
      `timeframe=${activeTimeFrame}&start=${startDate}`
    )
      .then((e: any) => {
        const reversedData = e?.bars.reverse()
        setHistoricalData(reversedData)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e, "ssssss")
      })
  }
  useEffect(() => {
    if (activeTimeFrame) {
      getHistoricalData()
    }
  }, [activeTimeFrame])

  return (
    <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow !mt-0 max-md:px-0 max-md:!py-0">
      <div className="max-md:hidden">
        <div className="flex-center-between">
          <div className="w-64">
            <ChartTimeFrame
              activeTime={activeTimeFrame}
              setActiveTime={setActiveTimeFrame}
            />
          </div>
          <div className="flex-center-between gap-2">
            <div className="flex items-center h-10 text-sm gap-3 text-brand-gray-60 dark:text-brand-gray-40">
              Show Rows
              <Select defaultValue="10">
                <SelectTrigger className="w-24 h-10 !rounded-xl cursor-pointer">
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
            <div>
              <Button
                onClick={() => {
                  handleDownloadCSV(historicalData)
                }}
                variant="ghost"
                className="h-[40px] inline-flex items-center rounded-xl text-sm font-semibold"
              >
                <DownloadCloud
                  size={22}
                  className="stroke-brand-gray-100 mr-2"
                />
                Download in CSV
              </Button>
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 />
            </div>
          ) : (
            <>
              <div className="max-md:w-auto max-md:overflow-auto">
                <StackTable
                  columns={HistoricalDataColumns}
                  data={dataPerPage}
                />
              </div>
              <Pagination
                data={historicalData}
                totalData={historicalData?.length}
                setDataPerPage={setDataPerPage}
              />
            </>
          )}
        </div>
      </div>
      <div className="md:hidden max-md:block">
        <HistoricalMobileView data={historicalData} />
      </div>
    </div>
  )
}

export default SpecificHistoricalData
