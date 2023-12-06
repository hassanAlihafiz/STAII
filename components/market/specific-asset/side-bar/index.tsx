"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { peopleBoughtData, staticData } from "@/utils/specific-asset"

import "@/styles/common-page.css"
import {
  formatMarketCap,
  numberWithCommasAndDecimals,
} from "@/async-functions/polygon/assets"
import { useAppSelector } from "@/store"
import { formatNumberValues } from "@/utils/format-input"
import { ChevronDown, ChevronUp, MoveDown, MoveUp } from "lucide-react"

import NewsListCard from "../news-list-card"

const SpecificAssetSideBar = ({ className = "" }: { className?: string }) => {
  const [showFullText, setShowFullText] = useState(false)
  const assetDetails = useAppSelector((state) => state?.stocks.currentStockData)

  const toggleText = () => {
    setShowFullText(!showFullText)
  }
  const description = assetDetails?.details?.description || "" // Replace with actual data source

  const displayedText = showFullText
    ? description
    : `${description.slice(0, 100)}...`
  if (assetDetails)
    return (
      <>
        <div
          className={`max-md:dark:bg-transparent bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base max-md:dark:ring-0 dark:ring-1 dark:ring-brand-blue-90 py-6 lg:px-6 ${className}`}
        >
          <div className="flex gap-2">
            <div className="bg-brand-gray-10 py-2 px-4 rounded-xl flex items-center justify-center text-sm text-brand-gray-60 dark:bg-brand-blue-90 dark:text-brand-gray-30">
              Tech
            </div>
            <div className="bg-brand-gray-10 py-2 px-4 rounded-xl flex items-center justify-center text-sm text-brand-gray-60 dark:bg-brand-blue-90 dark:text-brand-gray-30">
              NASDAQ
            </div>
            <div className="bg-brand-gray-10 py-2 px-4 rounded-xl flex items-center justify-center text-sm text-brand-gray-60 dark:bg-brand-blue-90 dark:text-brand-gray-30">
              Top 100
            </div>
          </div>
          <div className="black-lg-600 my-3 dark:text-white max-md:text-lg">
            About {assetDetails?.ticker}
          </div>
          <div>
            {showFullText ? (
              <>
                {displayedText}
                <button
                  className="text-brand-blue-70 text-sm flex items-center gap-1 mt-1 font-semibold"
                  onClick={toggleText}
                >
                  Read Less <ChevronUp size={14} />
                </button>
              </>
            ) : (
              <>
                {displayedText}
                <button
                  className="text-brand-blue-70 text-sm flex items-center gap-1 mt-1 font-semibold"
                  onClick={toggleText}
                >
                  Read More <ChevronDown size={14} />
                </button>
              </>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-4 pb-5 border-b border-brand-gray-10 text-sm dark:border-brand-gray-90">
            <div className="flex items-start gap-2 flex-wrap justify-between">
              {/* <div className="flex-1">
                <div className="text-brand-gray-50">Ceo</div>
                <div className="black-550 dark:text-white">
                  Timothy Donald Cook
                </div>
              </div> */}
              {/* <div className="flex-1">
                <div className="text-brand-gray-50">Sector</div>
                <div className="black-550 dark:text-white">
                  Electronic Technology
                </div>
              </div> */}
            </div>
            <div className="flex items-start gap-2 flex-wrap">
              <div className="flex-1">
                <div className="text-brand-gray-50">Employees</div>
                <div className="black-550 dark:text-white">
                  {assetDetails?.details?.total_employees.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }
                  )}
                </div>
              </div>
              {/* <div className="flex-1">
                <div className="text-brand-gray-50">Founded</div>
                <div className="black-550 dark:text-white">1976</div>
              </div> */}
            </div>
          </div>

          <div className="pt-5">
            <div className="black-lg-600 pb-3 dark:text-white">Statistics</div>
            <div className="flex flex-col pb-5 border-b border-brand-gray-10 dark:border-brand-gray-90">
              {assetDetails?.details?.change?.prevDay?.map((stat) => {
                return (
                  <div
                    className="flex-baseline-between pb-3 gap-4"
                    key={stat?.id}
                  >
                    <p className="whitespace-nowrap heading-box dark:text-brand-gray-30 text-sm">
                      {stat?.name}
                    </p>
                    <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-90"></div>
                    <p className="whitespace-nowrap black-550 text-sm dark:text-white">
                      {stat?.value}
                    </p>
                  </div>
                )
              })}
              <div className="flex-baseline-between pb-3 gap-4">
                <p className="whitespace-nowrap heading-box dark:text-brand-gray-30 text-sm">
                  Market Cap
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-90"></div>
                <p className="whitespace-nowrap black-550 text-sm dark:text-white">
                  {formatMarketCap(assetDetails?.details?.market_cap)}
                </p>
              </div>
              <div className="flex-baseline-between pb-3 gap-4">
                <p className="whitespace-nowrap heading-box dark:text-brand-gray-30 text-sm">
                  52 Wk High
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-90"></div>
                <p className="whitespace-nowrap black-550 text-sm dark:text-white">
                  {assetDetails?.range?.fiftyTwoWeekHigh}
                </p>
              </div>
              <div className="flex-baseline-between pb-3 gap-4">
                <p className="whitespace-nowrap heading-box dark:text-brand-gray-30 text-sm">
                  52 Wk Low
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-90"></div>
                <p className="whitespace-nowrap black-550 text-sm dark:text-white">
                  {assetDetails?.range?.fiftyTwoWeekLow}
                </p>
              </div>
            </div>
            <div className="pt-6 flex flex-col gap-4">
              <div className="black-600 text-lg dark:text-white">
                42 Analyst Ratings
              </div>
              <div className="flex gap-6">
                <div>
                  <div className=" flex justify-center  items-center text-2xl font-semibold w-[72px] h-[72px] rounded-[50%] text-brand-green-70 bg-brand-green-20 dark:bg-brand-green-100">
                    72%
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex-baseline-between mb-3 gap-4">
                    <div className="w-full bg-brand-green-70 h-[4px] rounded "></div>
                    <p className="whitespace-nowrap font-medium text-sm dark:text-white text-brand-green-70">
                      76% Buy
                    </p>
                  </div>
                  <div className="flex-baseline-between mb-3 gap-4">
                    <div className="w-full bg-brand-gray-50 h-[4px] rounded dark:bg-brand-gray-80"></div>
                    <p className="whitespace-nowrap black-500 text-sm  dark:text-white">
                      17% Hold
                    </p>
                  </div>{" "}
                  <div className="flex-baseline-between mb-3 gap-4">
                    <div className="w-full bg-brand-gray-50 h-[4px] rounded dark:bg-brand-gray-80"></div>
                    <p className="whitespace-nowrap black-500 text-sm  dark:text-white">
                      7% Sell
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Box - 2 */}

        <div
          className={`max-md:dark:bg-transparent max-md:dark:ring-0 mt-4 bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base dark:ring-1 dark:ring-brand-blue-90 py-6 lg:px-6 ${className}`}
        >
          <div className="black-600 text-lg pb-4 dark:text-white">
            Latest {assetDetails?.ticker} News
          </div>
          <div>
            <NewsListCard
              descriptionClass="gap-8"
              imageClass="w-full contents"
            />
          </div>
        </div>
        {/* Box - 2 */}

        {/* Box - 3 */}

        <div
          className={`max-md:dark:bg-transparent max-md:dark:ring-0 mt-4 bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base dark:ring-1 dark:ring-brand-blue-90 py-6 lg:px-6 ${className}`}
        >
          <div className="black-lg-600 mb-2 dark:text-white">
            People Also Bought
          </div>
          <div className="mt-3">
            {peopleBoughtData?.map((item: any) => (
              <div className="flex justify-between border-b border-brand-gray-20 dark:border-brand-gray-90 py-4">
                <div className="flex gap-3 items-center">
                  <div className=" w-6 h-6">
                    <Image
                      src={item.image}
                      width={24}
                      height={24}
                      alt="assetImage"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <Link
                      href=""
                      className="text-sm black-600 overflow-hidden whitespace-nowrap text-ellipsis w-[100px] dark:text-white"
                    >
                      {item.name}
                    </Link>
                    <div className="text-brand-gray-50 text-xs">
                      {item?.description}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div
                    className={`flex gap-1 items-center w-20 ${
                      item.change.startsWith("+")
                        ? "text-brand-green-70"
                        : "text-brand-red-80"
                    }`}
                  >
                    {item.change.startsWith("+") ? (
                      <MoveUp fill="brand-green-70" size={12} />
                    ) : (
                      <MoveDown fill="brand-green-70" size={12} />
                    )}
                    <div className="text-sm font-medium">{item.change}%</div>
                  </div>
                  <div>
                    <button className="text-sm bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-green-70 font-medium">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Box - 3*/}
      </>
    )
  return (
    <>
      <div className="spin-loader h-5 w-5 text-primary" role="status" />
    </>
  )
}

export default SpecificAssetSideBar
