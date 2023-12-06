import React from "react"
import Image from "next/image"
import { notifications } from "@/utils/notification"
import { ArrowLeftCircle, Bell, X } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NotificationDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="relative h-fit w-fit cursor-pointer ">
        <Bell className="mx-2 text-primary-foreground" strokeWidth="1px" />
        {notifications.length > 0 && (
          <span className="absolute -right-0 -top-2 flex min-w-max items-center justify-center rounded-full bg-[#EA580C] px-[7px] py-[2px] text-[10px]  text-white">
            {notifications.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className=" px-0  sm:w-[600px] sm:max-w-[600px] border-none outline-none focus:outline-none max-md:w-full"
      >
        <SheetHeader>
          <SheetTitle className="rounded-tl-2xl rounded-tr-2xl absolute top-0 z-[2] w-full py-4 text-left bg-white dark:bg-brand-blue-120">
            <div className="hidden max-md:flex max-md:items-center max-md:justify-between px-5">
              <div className="flex">
                <SheetClose className="">
                  <ArrowLeftCircle
                    color="#9CA5AF"
                    strokeWidth={"0.5px"}
                    size={"35px"}
                    className="dark:fill-brand-gray-70"
                  />
                </SheetClose>
              </div>
              <div className="w-full text-center text-base text-brand-gray-100 dark:text-white">
                All Notifications
              </div>
              <SheetClose className="outline-none">
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </SheetClose>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                All Notifications
              </div>
              <SheetClose className="absolute top-2 right-0 mr-5 mt-2 outline-none">
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </SheetClose>
            </div>

            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className="scroll-hidden h-full overflow-y-scroll px-2 pt-14 max-md:pt-16">
          {notifications.length > 0 ? (
            notifications?.map((notification, i) => (
              <div
                key={i}
                className="group flex h-[85px] w-full cursor-pointer items-center justify-start rounded-xl px-2 transition-all duration-200 hover:bg-[#5A82B0]"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                  <Image
                    src={notification.image}
                    alt=""
                    fill
                    className="z-[1]"
                  />
                </div>
                <div className="ml-4 mr-auto flex flex-col items-start max-w-[70%]">
                  <h6 className="text-sm font-semibold text-brand-gray-100 transition-colors duration-100 group-hover:text-white dark:text-white text-left max-h-[40px] overflow-hidden">
                    {notification.title}
                  </h6>
                  <p className="text-xs font-medium text-[#2B2D42] transition-colors duration-100 group-hover:text-white dark:text-white text-left max-h-[32px] overflow-hidden">
                    {notification.description}
                  </p>
                </div>
                <span className="text-[10px] text-brand-gray-60 transition-colors duration-100 group-hover:text-white min-w-max">
                  {notification.date}
                </span>
              </div>
            ))
          ) : (
            <div className="grid h-full w-full place-items-center dark:text-brand-gray-50">
              You Are All Caught Up!
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationDrawer
