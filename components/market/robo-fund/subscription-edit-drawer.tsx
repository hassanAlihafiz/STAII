"use client"

import React, { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { ArrowLeftCircle, X, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SliderWithPercentage from "@/components/ui/slider-with-percentage"

import "@/styles/common-page.css"
import { handleDoubleSlider } from "@/utils/slider-functions"

import SubscribedModal from "./subscribe-confirm-modal"

const initialState = [
  {
    id: 1,
    title: "Growth Financial",
    defaultValue: 60,
  },
  {
    id: 2,
    title: "RoboFunds",
    defaultValue: 40,
  },
]
interface Fund {
  id: number
  defaultValue: number
  title?: string
  level?: string
  value?: number
  color?: string
}

const SubscriptionEditDrawer = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [funds, setFunds] = useState<Fund[]>(initialState)
  const handleFundChange = (fundId: number, newValue: number) => {
    const updatedFunds = handleDoubleSlider(funds, fundId, newValue)
    setFunds(updatedFunds)
  }
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <span className="text-brand-green-70 cursor-pointer">Edit</span>
        </SheetTrigger>
        <SheetContent className="drawer-section drawer-responsive">
          <SheetHeader>
            <SheetTitle className="absolute top-0 w-full dark:text-white pt-6 bg-white dark:bg-brand-blue-120 z-10">
              <div className="hidden max-md:flex items-center justify-between px-5">
                <div className="flex">
                  <SheetClose>
                    <XCircle
                      size={40}
                      color="#9CA5AF"
                      strokeWidth={"0.5px"}
                      className="dark:fill-[#4B5563]"
                    />
                  </SheetClose>
                </div>
              </div>
              <div className="max-md:hidden">
                <div className="pl-6 text-base text-brand-gray-100 dark:text-white font-bold">
                  Adjust Funds Allocation
                </div>
                <DialogClose className="absolute top-4 right-0 mr-5 mt-2 outline-none">
                  <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
                </DialogClose>
              </div>
              <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
            <div className="text-brand-gray-100 dark:text-white mt-[85px]">
              <div className="px-4">
                <div className="md:hidden w-full text-2xl text-brand-gray-100 dark:text-white">
                  Adjust Funds Allocation
                </div>
                <p className="text-brand-gray-50 text-sm font-normal dark:text-brand-gray-30 max-md:mt-2">
                  Here you can adjust the percentage of allocations of funds
                  to each type of automated trading
                </p>
                <div className="pt-4">
                  {funds.map((fund) => (
                    <SliderWithPercentage
                      key={fund.id}
                      title={fund.title}
                      value={fund.defaultValue}
                      onChange={(newValue) =>
                        handleFundChange(fund.id, newValue)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </SheetDescription>
          <SheetFooter className="border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
            <div className=" p-[15px] flex justify-end items-center">
              <SheetClose asChild className="max-md:hidden">
                <Button
                  size="lg"
                  variant="ghost"
                  className="button-box mr-[20px] dark:border-transparent w-fit sm:w-auto h-14 text-base"
                >
                  Cancel
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  size="lg"
                  variant="default"
                  className="button-box dark:border-transparent w-fit sm:w-auto max-md:w-full h-14 text-base"
                  onClick={() => setOpen(true)}
                >
                  Save
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <SubscribedModal {...{ open, setOpen }} />
    </>
  )
}

export default SubscriptionEditDrawer
