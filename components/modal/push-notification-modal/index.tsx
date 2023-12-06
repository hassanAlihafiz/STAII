"use client"

import React from "react"
import Image from "next/image"
import { DialogClose } from "@radix-ui/react-dialog"
import * as Dialoge from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ToggleSwitch from "@/components/ui/toggle-switch"
import Card from "@/components/account/card/card-row"

const PushNotificationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end relative">
          <Image
            src="/icons/next.svg"
            alt="=Next icon"
            className="cursor-pointer absolute bottom-[21px] right-[17px] "
            width={27}
            height={27}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="pt-6 pb-3 right-[0px] !rounded-none h-[715px] overflow-auto sm:w-[450px] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 dark:text-white">
            <div className="pl-6 text-[16px]">Push Notifications</div>
            <DialogClose className="absolute -top-3 right-0 mr-5 mt-2 outline-none">
              <X className="ml-auto w-4 cursor-pointer text-[#9CA5AF]" />
            </DialogClose>
            <div className="bg-[#EDEEF3] h-[1px] w-full mt-[22px]"></div>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="text-[#2A3033]">
              <div className="p-[0px_23px] border-b-[1px] border-[#EDEEF3]">
                <h2 className="text-[16px] font-[600] pb-[15px]">Movements</h2>
              </div>
              <div className="p-[20px_23px] border-b-[1px] border-[#EDEEF3]">
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Market Milestone</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">
                      Watchlist Daily Top Gainer/Loser
                    </p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="pb-[25px]">
                  <div className="flex items-center justify-between">
                    {" "}
                    <div>
                      <p className="text-[14px] font-[500]">
                        Watchlist Movement
                      </p>
                    </div>
                    <div>
                      <ToggleSwitch onChange={() => {}} />
                    </div>
                  </div>
                  <div className="pt-[10px]">Timer</div>
                </div>
                <div className="pb-[25px]">
                  <div className="flex items-center justify-between">
                    {" "}
                    <div>
                      <p className="text-[14px] font-[500]">Price Alerts</p>
                    </div>
                    <div>
                      <ToggleSwitch onChange={() => {}} />
                    </div>
                  </div>
                  <div className="flex items-center justify-start pt-[10px]">
                    <div>
                      <p className="text-[#069D6E] text-[14px] font-[500]">
                        Manage
                      </p>
                    </div>
                    <div>
                      <Image
                        src="/icons/next.svg"
                        alt="=Next icon"
                        className="cursor-pointer ml-[5px]"
                        width={20}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="text-[16px] font-[600]">News</p>
                </div>
              </div>
              <div className="p-[20px_23px] border-b-[1px] border-[#EDEEF3]">
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Breaking News</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>{" "}
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Watchlist News</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="text-[16px] font-[600]">Community</p>
                </div>
              </div>
              <div className="p-[20px_23px] border-b-[1px] border-[#EDEEF3]">
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Mentions</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Follows</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Likes</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Replies</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Reposts</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Polls</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="text-[16px] font-[600]">RoboTrader</p>
                </div>
              </div>
              <div className="p-[20px_23px] border-b-[1px] border-[#EDEEF3]">
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Transaction</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Order Finished</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="text-[16px] font-[600]">System </p>
                </div>
              </div>
              <div className="p-[20px_23px] border-b-[1px] border-[#EDEEF3]">
                <div className="flex items-center justify-between pb-[25px]">
                  <div>
                    <p className="text-[14px] font-[500]">Important Updates</p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>{" "}
                <div className="flex items-center justify-between pb-[15px]">
                  <div>
                    <p className="text-[14px] font-[500]">
                      Order Event Promotions
                    </p>
                  </div>
                  <div>
                    <ToggleSwitch onChange={() => {}} />
                  </div>
                </div>
              </div>
              <div className="pt-[15px] pr-[20px] flex justify-end items-center">
                <Dialoge.Close asChild>
                  <Button variant="ghost" className="button-box mr-[20px]">
                    Cancel
                  </Button>
                </Dialoge.Close>
                <Button variant="default" className="button-box ">
                  Save
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PushNotificationModal
