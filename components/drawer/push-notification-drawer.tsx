"use client"

import React from "react"
import notification from "@/utils/notification.json"
import { DialogClose } from "@radix-ui/react-dialog"
import { ArrowLeftCircle, BellDot, ChevronRight, X } from "lucide-react"

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
import ToggleSwitch from "@/components/ui/toggle-switch"
import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"
import Image from "next/image"

import ToggleGroup_ from "../ui/toggle-group"

const PushNotificationDrawer = () => {
  const toggleData = [
    {
      title: "5%",
      value: 0,
    },
    {
      title: "8%",
      value: 1,
    },
    {
      title: "10%",
      value: 2,
    },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-end relative cursor-pointer">
          <Card title="Push Notifications" buttonVariant={"arrow"} noBorder />
        </div>
      </SheetTrigger>
      <SheetContent className="drawer-section drawer-responsive">
        <SheetHeader>
          <SheetTitle className="absolute top-0 w-full dark:text-white pt-6 bg-white dark:bg-brand-blue-120 z-10">
            <div className="hidden max-md:flex items-center justify-between px-5">
              <div className="flex">
                <SheetClose>
                  <ArrowLeftCircle
                    color="#9CA5AF"
                    strokeWidth={"0.5px"}
                    size={"35px"}
                    className="dark:fill-[#4B5563]"
                  />
                </SheetClose>
              </div>
              <div className="w-full text-center text-base text-brand-gray-100 dark:text-white">
                Push Notifications
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                Push Notifications
              </div>
              <DialogClose className="absolute top-4 right-0 mr-5 mt-2 outline-none">
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </DialogClose>
            </div>
            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px]"></div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="w-full overflow-auto h-[calc(100%-85px)]">
          <div className="text-brand-gray-100 dark:text-white mt-[85px]">
            <div className="p-4 border border-[#F4F5FA] notification-shadow rounded-xl !bg-white mx-5 mb-7 mt-[10px] flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-brand-orange-70 w-7 h-7 rounded-lg">
                  <BellDot size={16} />
                </div>
                <div>
                  <h2 className="black-600 text-sm">
                    Allow Push Notifications
                  </h2>
                </div>
              </div>
              <div>
                <p className="text-brand-gray-50 text-sm font-normal">
                  To start receiving notifications from us, please turn on
                  “Allow Notifications” in your device settings
                </p>
              </div>
              <div>
                <Button className="bg-[#FFF7ED] text-[#EA580C] font-medium text-sm rounded-lg h-9">
                  Open device settings
                </Button>
              </div>
            </div>
            {notification?.map((notify, index) => {
              return (
                <>
                  <div className="p-[0px_23px] border-b-[1px] border-brand-gray-20 dark:border-brand-gray-80">
                    <h2 className="text-base font-semibold pb-[15px] pt-[5px]">
                      {notify?.name}
                    </h2>
                  </div>
                  <div className="p-[20px_23px] ">
                    {notify?.options?.map((option) => (
                      <div>
                        <div className="flex-center-between pb-[25px]">
                          <div>
                            <p className="black-sm-500 dark:text-white">
                              {option.name}
                            </p>
                          </div>
                          <div>
                            <ToggleSwitch onChange={() => {}} />
                          </div>
                        </div>
                        {option?.name === "Watchlist Movement" && (
                          <div className="cursor-pointer mt-[-15px] pb-[25px]">
                            <ToggleGroup_
                              width="w-[250px]"
                              toggleData={toggleData}
                            />
                          </div>
                        )}
                        {option?.name === "Price Alerts" && (
                          <div className="flex items-center mt-[-15px] gap-1 cursor-pointer w-fit">
                            <p className="text-brand-green-70 text-[14px] font-[500]">
                              Manage
                            </p>
                            <ChevronRight
                              size={16}
                              className="stroke-brand-green-70"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )
            })}
          </div>
        </SheetDescription>
        <SheetFooter className="border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
          <div className=" p-[15px] flex justify-end items-center">
            <SheetClose asChild>
              <Button
                size="lg"
                variant="ghost"
                className="button-box mr-[20px] dark:border-transparent w-fit sm:w-auto"
              >
                Cancel
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                size="lg"
                variant="default"
                className="button-box dark:border-transparent w-fit sm:w-auto"
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

export default PushNotificationDrawer
