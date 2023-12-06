"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ArrowLeftCircle, X } from "lucide-react"

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

import language from "../../config/language/language.json"
import Card from "../account/card/card-row"

interface languageDrawerProps {
  lngState?: any
  setLngState?: any
}

const LanguageDrawer = ({ lngState, setLngState }: languageDrawerProps) => {
  const [checked, setChecked] = useState(Number)

  const handleSubmit = () => {
    if (checked === 0 || checked) {
      const lang = language.filter((lang, index) => {
        return index === checked
      })[0]
      setLngState(lang.name)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end relative cursor-pointer">
          <Card
            title="Language"
            buttonText={lngState}
            buttonVariant={"arrow"}
            onSubmit={(value) => {}}
          />
        </div>
      </SheetTrigger>
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
              <div className="w-full text-center text-base text-brand-gray-100 dark:text-white">
                Languages
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                Languages
              </div>
              <SheetClose className="absolute top-2 right-0 mr-5 mt-2 outline-none">
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </SheetClose>
            </div>

            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
          <div className="text-brand-gray-100 dark:text-white p-[2px_20px_0px_23px] mt-[80px] ">
            {language?.map((lang, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer flex-center-between border-b-[1px] border-brand-gray-20 dark:border-brand-gray-80 rounded"
                  onClick={() => {
                    setChecked(index)
                  }}
                >
                  <div className="py-[13px]">
                    <p className="text-brand-gray-900 dark:text-white text-sm font-medium">
                      {lang?.name}
                    </p>
                  </div>
                  {checked === index && (
                    <div key={index}>
                      <Image
                        src="/icons/check-bold.svg"
                        alt="=Next icon"
                        className=" cursor-pointer"
                        width={18}
                        height={18}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </SheetDescription>
        <SheetFooter className="border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
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
                onClick={() => {
                  handleSubmit()
                }}
                variant="default"
                className="buttonbox w-fit sm:w-auto"
              >
                Save
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default LanguageDrawer
