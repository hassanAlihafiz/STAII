"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"

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

import ChartTimeFrame from "../chart/TimeFrame"
import { Button } from "../ui/button"

interface FilterDrawerProps {}
const FilterDrawer: React.FC<FilterDrawerProps> = () => {
  const [activeTimeFrame, setActiveTimeFrame] = useState("1Day")
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex justify-end relative cursor-pointer">
            <Button variant="ghost" className="w-8 h-8 max-md:p-0 ">
              <SlidersHorizontal size={12} color="#069D6E" strokeWidth={1} />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent
          className=" right-0 !rounded-t-2xl !h-auto sm:w-[450px] sm:max-w-[600px]  border-t-0"
          side={"bottom"}
        >
          <SheetHeader>
            <SheetTitle className=" !rounded-t-xl top-0 w-full pt-4 text-left bg-white dark:bg-brand-blue-120">
              <div className="max-md:flex max-md:items-center max-md:justify-between px-5">
                <div className="text-lg black-600 dark:text-white">Filters</div>
                <SheetClose className=" top-2 right-0 mr-5 mt-2 outline-none">
                  <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
                </SheetClose>
              </div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="w-full ">
            <div className="text-brand-gray-100 dark:text-white pt-6 px-5 pb-8 ">
              <div className="flex flex-col gap-7">
                <div>
                  <div className="text-brand-gray-60 dark:text-brand-gray-30 text-sm">
                    Price change
                  </div>
                  <div>
                    <ChartTimeFrame
                      activeTime={activeTimeFrame}
                      setActiveTime={setActiveTimeFrame}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-brand-gray-60 dark:text-brand-gray-30 text-sm">
                    Show assets
                  </div>
                  <div>
                    <ChartTimeFrame
                      activeTime={activeTimeFrame}
                      setActiveTime={setActiveTimeFrame}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SheetDescription>
          <SheetFooter className="pb-5">
            <div className="w-full flex justify-end items-center px-4">
              <SheetClose asChild>
                <Button className="w-full">Cancel</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default FilterDrawer
