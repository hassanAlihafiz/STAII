"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ArrowLeftCircle, Info, X, XCircle } from "lucide-react"

import "@/styles/common-page.css"
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

import Card from "../account/card/card-row"

interface HelpCenterDrawerProps {
  title: string
  description: string
  border: boolean
  optional?: boolean
}
const HelpCenterDrawer = ({
  title,
  description,
  border,
  optional,
}: HelpCenterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end relative cursor-pointer">
          {optional ? (
            <>
              <Info className="h-5 w-5 text-[#069D6E]" />
            </>
          ) : (
            <>
              <Card
                title={title}
                buttonVariant={"arrow"}
                onSubmit={(value) => {}}
                noBorder={border}
              />
            </>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="drawer-section drawer-responsive">
        <SheetHeader>
          <SheetTitle className="absolute top-0 w-full pt-4 text-left bg-white dark:bg-brand-blue-120">
            <div className="hidden max-md:flex max-md:items-center max-md:justify-between px-5">
              <div className="flex items-center gap-3">
                <div>
                  <Info className="h-5 w-5 text-[#069D6E]" />
                </div>
                <div className="w-full text-center text-base text-brand-gray-100 dark:text-white">
                  {title}
                </div>
              </div>
              <div>
                <SheetClose>
                  <XCircle stroke="#37373a" />
                </SheetClose>
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                {title}
              </div>
              <SheetClose className="absolute top-1 right-0 mr-5 mt-2 outline-none">
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </SheetClose>
            </div>

            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
          <div className="text-brand-gray-100 dark:text-white px-3 mt-[65px] ">
            {description}
          </div>
        </SheetDescription>
        {/* <SheetFooter className="border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
          <div className="mt-2 pt-[12px] pr-[20px] flex justify-end items-center">
            <SheetClose asChild>
              <Button
                size="lg"
                variant="ghost"
                className="button-box mr-[20px] w-fit sm:w-auto"
              >
                Cancel
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                size="lg"
                variant="default"
                className="buttonbox w-fit sm:w-auto"
              >
                Save
              </Button>
            </SheetClose>
          </div>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

export default HelpCenterDrawer
