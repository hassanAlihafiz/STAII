"use client"

import React, { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { ArrowLeftCircle, Bell, X } from "lucide-react"

import "@/styles/common-page.css"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import { InputWithPercentage } from "@/components/ui/input-with-percentage"
import ToggleGroup_ from "@/components/ui/toggle-group"

interface aaplAlterProps {}
const AaplAlertModal: React.FC<aaplAlterProps> = ({}) => {
  const [currentSellType, setCurrentSellType] = useState<number>(0)
  const alertData = [
    {
      title: "Alert by $",
      value: 0,
    },
    {
      title: "Alert by %",
      value: 1,
    },
  ]
  const hoursData = [
    {
      title: "24hr",
      value: 0,
    },
    {
      title: "1hr",
      value: 1,
    },
  ]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end relative bg-brand-gray-10 p-3.5 rounded-xl cursor-pointer max-md:bg-transparent max-md:p-0">
          <Bell className="stroke-brand-green-70" />
        </div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive sm:!max-w-[400px] max-md:!h-full max-md:!rounded-none">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-6 text-left dark:text-white max-md:flex">
            <div className="max-md:hidden flex items-center">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full border border-brand-gray-20">
                  <Image
                    src="/images/market/apple.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
                <div className="black-600 text-base dark:text-white">
                  AAPL Alert
                </div>
              </div>
              <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
                <X className="ml-auto w-5 cursor-pointer text-[#9CA5AF]" />
              </DialogClose>
            </div>
            {/* mobile view */}
            <div className="md:hidden flex items-center justify-between z-10">
              <DialogClose>
                <ArrowLeftCircle
                  strokeWidth={"0.5px"}
                  size={"35px"}
                  className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                />
              </DialogClose>
            </div>
            <div className="md:hidden max-md:flex  max-md:justify-center max-md:items-center max-md:gap-2 max-md:w-full">
              <Image
                src="/images/market/apple.svg"
                width={24}
                height={24}
                alt=""
              />
              <span className="black-600 text-base dark:text-white">AAPL</span>
            </div>

            {/* mobile view */}
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="w-full">
                <ToggleGroup_
                  toggleData={alertData}
                  setCurrentSellType={setCurrentSellType}
                  className="max-md:!text-xs"
                />
              </div>
              <div className={`${currentSellType === 0 ? "mt-14" : "mt-10"} `}>
                {currentSellType === 0 ? (
                  <InputInsideLabel
                    inputLabel="Enter target price"
                    className="pl-0 text-gray-brand-100 border-none price-input text-center text-[40px] dark:bg-transparent font-semibold focus:!shadow-none focus:!border-0"
                    placeholder="0.00"
                    sign="$"
                    labelClass="w-full text-center -top-4 !left-0"
                  />
                ) : (
                  <InputWithPercentage
                    inputLabel="When price increases"
                    placeholder="0.00"
                    className="text-gray-brand-100 border-none price-input text-center !text-[40px] dark:bg-transparent font-semibold"
                    sign="%"
                  />
                )}
              </div>
              <div className="mt-6">
                <ToggleGroup_
                  toggleData={hoursData}
                  setCurrentSellType={setCurrentSellType}
                  className="max-md:!text-xs"
                />
              </div>
              <div className="flex mt-11">
                {currentSellType === 0 ? (
                  <>
                    {" "}
                    <div className="min-h-[25px] mr-2">
                      <Checkbox />
                    </div>
                    <div className="black-500 text-sm dark:text-brand-gray-60	">
                      Get Recurring Alerts
                    </div>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <div className="black-500 text-sm dark:text-brand-gray-60	">
                      Current price
                    </div>
                    <div className="dark:text-white text-sm">$132.63</div>
                  </div>
                )}
              </div>
              <div className="w-full mt-7">
                <Button className="rounded-xl">Set Price Alert</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AaplAlertModal
