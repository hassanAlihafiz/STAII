"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronDown, X } from "lucide-react"

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

import { Button } from "./button"

interface MobileViewSelectProps {
  items: any[]
}
const MobileViewSelect: React.FC<MobileViewSelectProps> = ({ items }) => {
  const [checked, setChecked] = useState(Number)
  const [value, setValue] = useState("Simple")

  const handleSubmit = () => {
    if (checked === 0 || checked) {
      const selectValue = items?.filter((item: any) => {
        return item?.id === checked
      })[0]
      setValue(selectValue?.value)
    }
  }
  return (
    <div className="md:hidden max-md:block">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex justify-end relative cursor-pointer">
            <div className="flex-center-between w-[150px] border border-brnad-gray-30 py-2 px-3 rounded-xl">
              <div className="blac-400 text-sm">{value}</div>
              <div>
                <ChevronDown size={20} color="#9CA5AF" strokeWidth={2} />
              </div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          className=" right-0 !rounded-t-xl !h-[430px] sm:w-[450px] sm:max-w-[600px]"
          side={"bottom"}
        >
          <SheetHeader>
            <SheetTitle className="absolute !rounded-t-xl top-0 w-full pt-4 text-left bg-white dark:bg-brand-blue-120">
              <div className="max-md:flex max-md:items-center max-md:justify-between px-5">
                <div className="text-lg black-600 dark:text-white">
                  Select order type
                </div>
                <SheetClose className="absolute top-2 right-0 mr-5 mt-2 outline-none">
                  <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
                </SheetClose>
              </div>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
            <div className="text-brand-gray-100 dark:text-white p-[2px_20px_0px_23px] mt-[80px] ">
              {items?.map((item: any) => {
                return (
                  <div
                    key={item?.id}
                    className="cursor-pointer flex-center-between border-b-[1px] border-brand-gray-20 dark:border-brand-gray-80 rounded"
                    onClick={() => {
                      setChecked(item?.id)
                    }}
                  >
                    <div className="py-[13px]">
                      <p className="text-brand-gray-900 dark:text-white text-sm font-medium">
                        {item?.label}
                      </p>
                    </div>
                    {checked === item?.id && (
                      <div key={item?.id}>
                        <Image
                          src="/icons/check-bold.svg"
                          alt="=Next icon"
                          className=" cursor-pointer"
                          width={15}
                          height={15}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </SheetDescription>
          <SheetFooter>
            <div className="w-full flex justify-end items-center px-4">
              <SheetClose asChild>
                <Button className=" w-full " onClick={handleSubmit}>
                  Submit
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileViewSelect
