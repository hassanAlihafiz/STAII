"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { priceAlertData } from "@/utils/specific-asset"
import {
  ArrowLeftCircle,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import BackBtn from "@/components/ui/back-button"
import ToggleSwitch from "@/components/ui/toggle-switch"

const PriceAlert = () => {
  return (
    <div className="w-[700px] m-auto max-md:w-auto max-md:-mt-10">
      <div className="max-md:hidden">
        <BackBtn />
      </div>
      <div className="mt-6 mb-5">
        <div className="max-md:hidden black-600 text-2xl dark:text-white">
          Price Alerts
        </div>
        {/* mobile view */}
        <div className="flex">
          <div className="md:hidden flex items-center justify-between z-10">
            <Link href="/markets/specific-asset/overview">
              <ArrowLeftCircle
                strokeWidth={"0.5px"}
                size={"35px"}
                className="stroke-brand-gray-50 dark:fill-brand-gray-70"
              />
            </Link>
          </div>
          <div className="md:hidden max-md:flex  max-md:justify-center max-md:items-center max-md:gap-2 max-md:w-full">
            <span className="black-600 text-base dark:text-white">AAPL</span>
          </div>
        </div>
        {/* mobile view */}
        {priceAlertData?.map((PriceAlert) => {
          return (
            <div key={PriceAlert?.id}>
              <div className="flex gap-2  items-center mt-6 mb-2 max-md:mb-4">
                <div className="w-6 h-6 rounded-full border border-brand-gray-20">
                  <Image
                    src={PriceAlert?.titleimage}
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
                <div>
                  <span className="black-600 text-base dark:text-white">
                    {PriceAlert?.title.split(" ")[0]}
                  </span>{" "}
                  <span className="text-brand-gray-50 text-base">
                    {" "}
                    {PriceAlert?.title.split(" ")[1]}
                  </span>
                </div>
              </div>
              {PriceAlert?.option?.map((price, index) => {
                return (
                  <div
                    className={`flex justify-between py-3 ${
                      index === PriceAlert?.option?.length - 1
                        ? ""
                        : "border-b border-brand-gray-20 dark:border-brand-blue-90 "
                    }`}
                    key={price?.id}
                  >
                    <div className="flex gap-3">
                      <div>
                        {price?.content?.includes("increase") && (
                          <TrendingUp
                            size={20}
                            strokeWidth={2}
                            color="#069D6E"
                          />
                        )}
                        {price?.content?.includes("price") && (
                          <DollarSign
                            size={20}
                            color="#C6CAD2"
                            strokeWidth={1}
                          />
                        )}
                        {price?.content?.includes("drop") && (
                          <TrendingDown
                            size={20}
                            strokeWidth={2}
                            color="#EA1717"
                          />
                        )}
                      </div>
                      <div>
                        <div className="black-600 text-sm dark:text-white">
                          {price?.content}
                        </div>
                        <div className="text-brand-gray-60 text-sm dark-text-gray-40">
                          {price?.dateCreated}
                        </div>
                      </div>
                    </div>
                    <div>
                      <ToggleSwitch onChange={() => {}} />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PriceAlert
