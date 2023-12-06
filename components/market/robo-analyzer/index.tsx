"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RoboFundsData } from "@/utils/market"
import { ChevronDown, ChevronUp, MoveDown, MoveUp } from "lucide-react"

const RoboAnalyzerSideBar = ({ className = "" }: { className?: string }) => {
  const [showFullText, setShowFullText] = useState(false)

  const toggleText = () => {
    setShowFullText(!showFullText)
  }

  return (
    <>
      <div
        className={`bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base dark:ring-1 dark:ring-brand-blue-90 py-6 lg:px-6 ${className}`}
      >
        <div className="black-lg-600 mb-2">About Growth Financial</div>
        <div>
          {showFullText ? (
            <>
              Apple, Inc. engages in the design, manufacture, and sale of
              smartphones, personal computers, tablets, wearables and
              accessories, and other varieties of related services. It operates
              through the following geographical segments: Americas, Europe,
              Greater China, Japan, and Rest of Asia Pacific. The Americas
              segment includes North and South America. The Europe segment
              consists of European countries, as well as India, the Middle East,
              and Africa. The Greater China segment comprises China, Hong Kong,
              and Taiwan. The Rest of Asia Pacific segment includes Australia
              and Asian countries. Its products and services include iPhone,
              Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products,
              AppleCare, iCloud, digital content stores, streaming, and
              licensing services. The company was founded by Steven Paul Jobs,
              Ronald Gerald Wayne, and Stephen G. Wozniak in April 1976 and is
              headquartered in Cupertino, CA.
              <button
                className="text-brand-blue-70 text-sm flex items-center gap-1 mt-1 font-semibold"
                onClick={toggleText}
              >
                Read Less <ChevronUp size={14} />
              </button>
            </>
          ) : (
            <>
              Apple, Inc. engages in the design, manufacture, and sale of
              smartphones, personal computers, tablets, wearables and...
              <button
                className="text-brand-blue-70 text-sm flex items-center gap-1 mt-1 font-semibold"
                onClick={toggleText}
              >
                Read More <ChevronDown size={14} />
              </button>
            </>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-4 pb-5 border-b border-brand-gray-10">
          <div className="flex items-start gap-2 flex-wrap justify-between">
            <div className="flex-1">
              <div className="text-brand-gray-50">Creator</div>
              <div className="black-550">Dustin Stevens</div>
            </div>
            <div className="flex-1">
              <div className="text-brand-gray-50">Strategy</div>
              <div className="black-550">Event Driven</div>
            </div>
          </div>
          <div className="flex items-start gap-2 flex-wrap">
            <div className="flex-1">
              <div className="text-brand-gray-50">SocialTraderAI Rank</div>
              <div className="black-550">#1</div>
            </div>
            <div className="flex-1">
              <div className="text-brand-gray-50">Philosophy</div>
              <div className="black-550">Fundamental</div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="black-lg-600 mb-3">Statistics</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-brand-gray-60">
                3 Year-Compound Annual Return
              </div>
              <div className="black-550">38.23%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-brand-gray-60">2022 Return</div>
              <div className="black-550">62.78%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-brand-gray-60">Risk level</div>
              <div className="black-550">Medium</div>
            </div>
          </div>
        </div>
      </div>

      {/* Box - 2 */}

      <div
        className={`mt-4 bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base dark:ring-1 dark:ring-brand-blue-90 py-6 lg:px-6 ${className}`}
      >
        <div className="black-lg-600 mb-2">You May Also Be Interested In</div>
        <div className="mt-3">
          {RoboFundsData?.map((item: any) => (
            <div className="flex gap-3 border-b border-brand-gray-10 py-4">
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
                <Link
                  href="/market/robo-analyzer"
                  className="text-sm black-600 overflow-hidden whitespace-nowrap text-ellipsis w-[100px]"
                >
                  {item.name}
                </Link>
              </div>

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
                <div className="text-sm">{item.change}%</div>
              </div>
              <button className="text-sm bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-green-70 font-medium">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RoboAnalyzerSideBar
