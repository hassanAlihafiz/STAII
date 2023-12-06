"use client"

import React, { useEffect, useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { getAssetBarSymbol } from "@/async-functions/alpaca/assets"
import { getAssetsBarData } from "@/async-functions/polygon/assets"
import { useAppSelector } from "@/store"

import BasicAreaChart from "@/components/ui/basic-area-chart"
import StockChart from "@/components/ui/stock-chart"
import RoundTabs from "@/components/ui/tabs"
import ChartTimeFrame from "@/components/chart/TimeFrame"
import AddPost from "@/components/community/add-post"
import SpecificAssetSideBar from "@/components/market/specific-asset/side-bar"
import Tabs from "@/components/market/tab"
import SelectTradeModal from "@/components/modal/script/select-trade"

const SpecificOverview = () => {
  const [activeTab, setActiveTab] = useState("All")
  const router = useRouter()
  const params = useParams()
  const [data, setData] = useState([])
  const [activeTimeFrame, setActiveTimeFrame] = useState("1M")
  const token = useAppSelector((state) => state?.user?.token)
  const [showGraph, setShowGraph] = useState(true)
  const tabsData = ["All", "Original", "Links", "Media", "My Posts", "People"]
  const handleActiveTab = (value: string) => {
    setActiveTab(value)
  }

  const asyncFetch = () => {
    getAssetsBarData(params?.name, activeTimeFrame)
      .then((e: any) => {
        setData(e)
      })
      .then((e) => {
        console.log("err", e)
      })
  }
  useEffect(() => {
    if (activeTimeFrame) {
      asyncFetch()
    }
  }, [activeTimeFrame])

  const assetDetails = useAppSelector((state) => state?.stocks.currentStockData)

  if (assetDetails)
    return (
      <>
        <main className="mx-auto max-w-7xl !pb-16 max-md:!pb-0">
          <div className="lg:flex items-start gap-6 xl:gap-8">
            {/* left */}
            <div className="flex-1">
              {/* Chart header */}
              <div className="bg-white lg:shadow-base py-6 lg:px-6 rounded-xl dark:bg-brand-blue-120 max-md:dark:bg-transparent max-md:pt-0">
                <div className="flex flex-wrap items-center justify-between max-md:hidden">
                  <div className="text-xs flex-1">
                    O <span className="text-brand-green-70">152.63</span> H
                    <span className="text-brand-green-70"> 140.63</span> L
                    <span className="text-brand-green-70"> 112.63</span> C
                    <span className="text-brand-green-70"> 131.63</span>
                    <span className="text-brand-green-70"> +0.04 (+0.32%)</span>
                  </div>
                  <div className="flex-1">
                    <ChartTimeFrame
                      showMaxIcon
                      showTrendIcon
                      showGraph={showGraph}
                      setShowGraph={setShowGraph}
                      activeTime={activeTimeFrame}
                      setActiveTime={setActiveTimeFrame}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-48 xl:h-[314px] rounded-md">
                    {showGraph ? (
                      <BasicAreaChart data={data} />
                    ) : (
                      <StockChart data={data} />
                    )}
                  </div>
                  <div className="md:hidden">
                    <ChartTimeFrame
                      showMaxIcon
                      showTrendIcon
                      showGraph={showGraph}
                      setShowGraph={setShowGraph}
                      activeTime={activeTimeFrame}
                      setActiveTime={setActiveTimeFrame}
                    />
                  </div>
                </div>
              </div>
              {/* mobile view */}
              <div className="md:hidden">
                <SpecificAssetSideBar className="max-md:pt-3" />
              </div>
              {/* mobile view */}
              <div className="mt-3 lg:mt-6 max-md:mt-0 p-6 dark:bg-brand-blue-120 max-md:dark:bg-transparent rounded-xl max-md:p-0">
                <p className="black-lg-600 mb-4 dark:text-white">
                  Apple Community
                </p>
                <AddPost />
                <RoundTabs
                  activeTab={activeTab}
                  handleActiveTab={handleActiveTab}
                  tabsData={tabsData}
                />
                <Tabs activeTab={activeTab} />
              </div>
            </div>
            <div className="md:hidden w-full fixed bg-white top-[588px]  flex justify-between items-center gap-4 border-t border-brand-gray-20 dark:border-brand-blue-90 -ml-4 -mr-4 py-4 px-5">
              <div className="w-full">
                <div className="text-brand-gray-50 text-sm">Today’s volume</div>
                <div className="black-600 text-base dark:text-white">
                  32,387.99
                </div>
              </div>
              <div className="w-full">
                <SelectTradeModal />
              </div>
            </div>
            {/* right */}
          </div>
        </main>
      </>
    )
  return (
    <>
      <div className="spin-loader h-5 w-5 text-primary" role="status" />
    </>
  )
}

export default SpecificOverview
