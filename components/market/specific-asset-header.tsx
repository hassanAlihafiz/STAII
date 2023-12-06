"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useAppSelector } from "@/store"
import { ArrowLeftCircle, MoveUp, Star } from "lucide-react"

import SelectTradeModal from "../modal/script/select-trade"
import AaplAlertModal from "../modal/specific-asset/script-alert"
import BackBtn from "../ui/back-button"

const SpecificAssetPages = (scriptName: string) => [
  {
    name: "Overview",
    href: `/script/${scriptName}`,
  },
  {
    name: "Community",
    href: `/script/${scriptName}/community`,
  },
  {
    name: "News",
    href: `/script/${scriptName}/news`,
  },
  {
    name: "Historical Data",
    href: `/script/${scriptName}/historical-data`,
  },
]
Object.freeze(SpecificAssetPages)

interface AssetDetails {
  id: string
  class: string
  exchange: string
  symbol: string
  name: string
  status: string
  tradable: boolean
  marginable: boolean
  maintenance_margin_requirement: number
  shortable: boolean
  easy_to_borrow: boolean
  fractionable: boolean
  attributes: []
}
const SpecificAssetNavHeader = ({
  children,
}: {
  children?: React.ReactElement
}) => {
  const pathname = usePathname()
  const params = useParams()
  const [latestTrade, setLatestTrader] = useState<any>({})

  const assetDetails = useAppSelector((state) => state?.stocks.currentStockData)
  if (assetDetails)
    return (
      <div>
        <div className="max-md:flex  max-md:justify-between">
          <div className="mb-4 max-md:hidden">
            <BackBtn />
          </div>

          <div className="max-md:hidden flex items-center justify-between flex-wrap gap-4 mb-4 ">
            <div className="flex-[3]">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full border border-brand-gray-20">
                  <Image
                    src={
                      assetDetails?.details?.branding?.icon_url +
                      "?apikey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND"
                    }
                    width={100}
                    height={100}
                    alt=""
                    className="object-cover h-full w-full "
                  />
                </div>
                <div>
                  <p className="text-[#555768] dark:text-brand-gray-30">
                    {params?.name?.toUpperCase()} •{" "}
                    {assetDetails?.details?.name}
                  </p>
                  <div className="flex gap-2 items-end">
                    <h2 className="black-600 text-2xl font-bold dark:text-white">
                      $
                      {Number(assetDetails?.details?.change?.fmv || 0).toFixed(
                        2
                      )}
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
                <div className="w-fit flex gap-3">
                  <div>
                    <AaplAlertModal />
                  </div>
                  <div className=" bg-brand-gray-10 p-3.5 rounded-xl cursor-pointer">
                    <Star className="stroke-brand-green-70" />
                  </div>
                </div>
                <SelectTradeModal />
              </div>
            </div>
          </div>

          {/* mobile view */}
          <div className="md:hidden flex items-center justify-between z-10">
            <Link href="">
              <div>
                <ArrowLeftCircle
                  strokeWidth={"0.5px"}
                  size={"35px"}
                  className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                />
              </div>
            </Link>
          </div>
          <div className="md:hidden max-md:flex  max-md:justify-between max-md:items-center max-md:gap-2">
            <Image
              src={
                assetDetails.details?.branding?.icon_url
                  ? assetDetails.details?.branding?.icon_url +
                    "?apikey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND"
                  : "/images/logo-icon.svg"
              }
              width={24}
              height={24}
              alt=""
            />
            <span className="black-600 text-base dark:text-white">
              {params?.name.toUpperCase()}
            </span>
          </div>
          <div className="md:hidden cursor-pointer">
            <Star className="stroke-brand-green-70" />
          </div>
          {/* mobile view */}
        </div>

        <div className="flex justify-between items-center w-full">
          <ul className="flex max-md:justify-center items-center border-b border-brand-gray-20 dark:border-brand-blue-90 w-full max-w-[1280px] overflow-auto">
            {SpecificAssetPages(params?.name).map((link, i) => (
              <li
                className={`relative mr-6 grid h-full place-items-center  max-md:mr-3`}
                key={i}
              >
                <Link
                  href={link.href}
                  className={`max-md:text-sm black-500 py-5 capitalize  dark:text-white ${
                    pathname !== link.href &&
                    "text-brand-gray-60 dark:text-brand-gray-30"
                  }`}
                >
                  {link.name}
                </Link>

                <span
                  className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2  bg-primary-foreground  transition-all duration-300 "
                  style={
                    pathname === link.href ? { width: "100%" } : { width: "0" }
                  }
                />
              </li>
            ))}
          </ul>
          {children}
        </div>
        {/* mobile view */}
        <div className="md:hidden max-md:mt-5">
          <div className="black-600 dark:text-brand-gray-30 text-base">
            {assetDetails?.name}
          </div>
          <div className="max-md:flex max-md:items-center max-md:gap-3 black-600 text-3xl  dark:text-white max-md:mt-2">
            ${Number(assetDetails?.details?.change?.fmv || 0).toFixed(2)}
            <AaplAlertModal />
          </div>
          <div className="flex items-center gap-1 max-md:text-sm mt-2">
            <MoveUp size={14} className="stroke-brand-green-70" />
            <div>
              <span className="text-brand-green-70">$0.00091 (1.7%)</span>
              <span className="text-brand-gray-50 dark:text-brand-gray-30">
                last week
              </span>
            </div>
          </div>
        </div>
        {/* mobile view */}
      </div>
    )
  return (
    <>
      <div className="spin-loader h-5 w-5 text-primary" role="status" />
    </>
  )
}

export default SpecificAssetNavHeader
