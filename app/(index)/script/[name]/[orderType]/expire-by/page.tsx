"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeftCircle, X } from "lucide-react"

import "@/styles/common-page.css"
import { useParams } from "next/navigation"

import BackBtn from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const SetTimeForce = ({}: {}) => {
  const params = useParams()
  return (
    <div className="w-full max-w-[480px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden  max-md:h-[85vh] ">
      <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow h-full">
        {/* header */}
        <div className="flex-center-between">
          <div className="max-md:hidden">
            <BackBtn />
          </div>

          <div className="max-md:hidden">
            <Link href="/buy/aapl">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </Link>
          </div>
          <div className="md:hidden flex items-center justify-between z-10">
            <Link href="/buy/aapl">
              <div>
                <ArrowLeftCircle
                  strokeWidth={"0.5px"}
                  size={"35px"}
                  className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                />
              </div>
            </Link>
          </div>
        </div>
        {/* header */}
        <div className="flex flex-col gap-6 max-md:justify-between max-md:h-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col mt-6">
              <div className="text-2xl black-600 dark:text-white">
                Set Time In Force
              </div>
              <div className="text-brand-gray-60 text-sm dark:text-brand-gray-30">
                If the order doesn&apos;t execute, it should expire by:
              </div>
            </div>

            <div className="h-[1px] w-full bg-brand-gray-20 dark:bg-brand-blue-90"></div>
            <div>
              <RadioGroup>
                <div className="flex  items-center ">
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem
                        value="Monday 6:00 PM"
                        id="Monday 6:00 PM"
                        color="success"
                      />
                      <span className="text-base black-600  dark:text-white">
                        Monday 6:00 PM
                      </span>
                    </div>

                    <div className="text-brand-gray-50 text-sm ml-7 dark:text-brand-gray-30">
                      Good till after-hours close
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-brand-gray-20 my-4 dark:bg-brand-blue-90"></div>
                <div className="flex flex-col  ">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      className="text-base black-600"
                      value="Feb 25, 2023"
                      color="success"
                    />
                    <span className="text-base black-600  dark:text-white">
                      Feb 25, 2023
                    </span>
                  </div>
                  <div className="text-brand-gray-50 text-sm ml-7 dark:text-brand-gray-30">
                    Good till canceled (up to 90 days)
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mb-4">
            <Link href={`/script/${params?.name}/${params?.orderType}/confirm`}>
              <Button className="rounded-xl">Continue</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetTimeForce
