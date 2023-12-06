"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeftCircle, MoveUp, Router, Star } from "lucide-react"

import BackBtn from "@/components/ui/back-button"
import BasicAreaChart from "@/components/ui/basic-area-chart"
import { Button } from "@/components/ui/button"
import RoundTabs from "@/components/ui/tabs"
import ChartTimeFrame from "@/components/chart/TimeFrame"
import AddPost from "@/components/community/add-post"
import RoboAnalyzerSideBar from "@/components/market/robo-analyzer"
import Tabs from "@/components/market/tab"
import SelectTradeModal from "@/components/modal/script/select-trade"

const MarketOverview = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("All")
  const [activeTimeFrame, setActiveTimeFrame] = useState("1Day")
  const tabsData = ["All", "Original", "Links", "Media", "My Posts", "People"]
  const handleActiveTab = (value: string) => {
    setActiveTab(value)
  }

  const [data, setData] = useState([])

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error)
      })
  }

  const onSubscribeHanlde = () => {
    router.push("/market/robo-funds/subscription")
  }

  return (
    <>
      <div className="max-md:flex  max-md:justify-between max-md:px-4 max-md:pb-5">
        <div className="mb-4 max-md:hidden">
          <BackBtn />
        </div>
        <div className="max-md:hidden flex items-center justify-between flex-wrap gap-4 pb-6 mb-3 mt-4 border-b border-brand-gray-20 dark:border-brand-blue-90 max-md:border-b-0">
          <div className="flex-[3]">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full border border-brand-gray-20">
                <Image
                  src="/images/stocks/TGT.svg"
                  width={100}
                  height={100}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-brand-gray-60 dark:text-brand-gray-30">
                  Growth Financial • Funds assets
                </p>
                <div className="flex gap-2 items-end">
                  <h2 className="black-600 text-2xl font-bold dark:text-white">
                    $500,000,000.00
                  </h2>
                  <div className="flex items-center gap-1">
                    <MoveUp size={14} className="stroke-brand-green-70" />
                    <div>
                      <span className="text-brand-green-70">
                        $0.00091 (1.7%)
                      </span>
                      <span className="text-brand-gray-50 dark:text-brand-gray-30">
                        {" "}
                        last week
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center whitespace-nowrap gap-3">
              <div className="w-fit">
                <p className="text-brand-gray-50 dark:text-brand-gray-30">
                  Subscription Fee
                </p>
                <p className="black-lg-600 dark:text-white">$15/month</p>
              </div>
              <div className="w-full">
                <Button
                  onClick={onSubscribeHanlde}
                  className="w-full rounded-xl"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile view */}
        <div className="md:hidden flex items-center justify-between z-10 ">
          <Link href="/market/robo-funds">
            <div>
              <ArrowLeftCircle
                strokeWidth={"0.5px"}
                size={"40px"}
                className="stroke-brand-gray-50 dark:fill-brand-gray-70"
              />
            </div>
          </Link>
        </div>
        <div className="md:hidden max-md:flex  max-md:justify-between max-md:items-center max-md:gap-2">
          <Image src="/images/stocks/TGT.svg" width={20} height={20} alt="" />
          <span className="black-600 text-base dark:text-white">
            Growth Financial
          </span>
        </div>
        <div className="md:hidden cursor-pointer">
          <Star className="stroke-brand-green-70" />
        </div>
        {/* mobile view */}
      </div>
      <div className="md:hidden max-md:px-4 flex gap-1 flex-col">
        <div className="text-brand-gray-30 text-base font-semibold">
          Fund assets
        </div>
        <div>
          <h2 className="text-3xl font-bold dark:text-white">
            $500,000,000.00
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <MoveUp size={14} className="stroke-brand-green-70" />
          <div>
            <span className="text-brand-green-70">$0.00091 (1.7%)</span>
            <span className="text-brand-gray-50 dark:text-brand-gray-30">
              {" "}
              last week
            </span>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl pt-1 pb-16 max-md:px-4 max-md:pb-0">
        <div className="lg:flex items-start gap-6 xl:gap-8 ">
          {/* left */}
          <div className="flex-1 ">
            {/* Chart header */}
            <div className="bg-white lg:shadow-base py-6 lg:px-6  dark:bg-brand-blue-120 rounded-xl max-md:dark:bg-transparent max-md:flex max-md:flex-col-reverse max-md:py-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="text-xs flex-1 max-md:hidden">
                  O <span className="text-brand-green-70">152.63</span> H
                  <span className="text-brand-green-70"> 140.63</span> L
                  <span className="text-brand-green-70"> 112.63</span> C
                  <span className="text-brand-green-70"> 131.63</span>
                  <span className="text-brand-green-70"> +0.04 (+0.32%)</span>
                </div>
                <div className="flex-1 max-md:mt-3">
                  <ChartTimeFrame
                    activeTime={activeTimeFrame}
                    setActiveTime={setActiveTimeFrame}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div className="h-48 xl:h-[314px] rounded-md">
                  <BasicAreaChart data={data} />
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <RoboAnalyzerSideBar className="max-md:dark:bg-transparent max-md:dark:ring-0 max-md:!py-0" />
            </div>
            <div className="mt-3 lg:mt-4 md:dark:bg-brand-blue-120 rounded-xl md:p-6">
              <p className="black-lg-600 mb-4 dark:text-white">
                Growth Financial Community
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
          {/* right */}
          <div className="hidden lg:block max-w-xs xl:max-w-sidebar w-full sticky top-6">
            <RoboAnalyzerSideBar />
          </div>
        </div>
        <div className="md:hidden flex justify-between items-center gap-4 border-t border-brand-gray-20 dark:border-brand-blue-90 -ml-4 -mr-4 pt-4 px-5">
          <div className="w-full">
            <div className="text-brand-gray-50 text-sm">Subscription fee</div>
            <div className="black-600 text-base dark:text-white">$15/month</div>
          </div>
          <div className="w-full">
            <Button onClick={onSubscribeHanlde} className="w-full rounded-xl">
              Subscribe
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

export default MarketOverview
