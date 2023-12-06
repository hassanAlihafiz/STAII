"use client"

import React from "react"
import { ArrowLeftCircle, X } from "lucide-react"

import "@/styles/common-page.css"
import { AccountActivity } from "@/types/alpaca"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface languageDrawerProps {
  details: AccountActivity
  open?: boolean
  setOpen?: any
  setDetails?: any
}

const TransferDetails = ({
  details,
  open,
  setOpen,
  setDetails,
}: languageDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent className="drawer-section drawer-responsive">
        <SheetHeader>
          <SheetTitle className="absolute top-0 w-full pt-4 text-left bg-white dark:bg-brand-blue-120">
            <div className="hidden max-md:flex max-md:items-center max-md:justify-between px-5">
              <div className="flex">
                <SheetClose className="">
                  <ArrowLeftCircle
                    color="#9CA5AF"
                    strokeWidth={"0.5px"}
                    size={"35px"}
                    className="dark:fill-[#4B5563]"
                  />
                </SheetClose>
              </div>
              <div className="max-md:hidden w-full text-center text-base text-brand-gray-100 dark:text-white">
                Transfer Details
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                Transfer Details
              </div>
              <SheetClose className="absolute top-2 right-0 mr-5 mt-2 outline-none">
                <X
                  className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50"
                  onClick={() => {
                    setOpen(!open)
                    setDetails(null)
                  }}
                />
              </SheetClose>
            </div>

            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
          <div className="text-brand-gray-100 dark:text-white p-[2px_20px_0px_23px] mt-[80px] ">
            <div>
              <div>
                <h1
                  className={`black-600 text-[32px] 
                
                ${
                  details?.net_amount?.toString().startsWith("-")
                    ? "text-brand-gray-100 dark:text-white"
                    : "text-brand-green-70"
                }
                
                `}
                >
                  {details?.net_amount}
                </h1>
              </div>
              <div>
                <p className="text-brand-gray-60 text-sm font-medium mt-3 dark:text-brand-gray-30">
                  {details.activity_type}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex-baseline-between mb-[15px] gap-4">
                <p className="whitespace-nowrap text-brand-gray-60 text-sm fornt-normal  dark:text-brand-gray-30">
                  Status
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
                <p className="whitespace-nowrap black-600 text-sm dark:text-white">
                  {details.status}
                </p>
              </div>
              <div className="flex-baseline-between mb-[15px] gap-4">
                <p className="whitespace-nowrap text-brand-gray-60 text-sm fornt-normal  dark:text-brand-gray-30">
                  Account
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
                <p className="whitespace-nowrap black-600 text-sm dark:text-white">
                  {details.account_id}
                </p>
              </div>{" "}
              <div className="flex-baseline-between mb-[15px] gap-4">
                <p className="whitespace-nowrap text-brand-gray-60 text-sm fornt-normal  dark:text-brand-gray-30">
                  Initiated
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
                <p className="whitespace-nowrap black-600 text-sm dark:text-white">
                  {details?.date}
                </p>
              </div>{" "}
              <div className="flex-baseline-between mb-[15px] gap-4">
                <p className="whitespace-nowrap text-brand-gray-60 text-sm fornt-normal  dark:text-brand-gray-30">
                  Description
                </p>
                <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
                <p className="whitespace-nowrap black-600 text-sm dark:text-white">
                  {details.description || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default TransferDetails
