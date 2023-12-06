"use client"

import React from "react"
import * as Dialoge from "@radix-ui/react-dialog"

import "@/styles/common-page.css"
import { DialogClose } from "@radix-ui/react-dialog"
import { LucideAlertTriangle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const BuyingPowerModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex text-base font-medium">Not Enough Money</div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive">
        <DialogHeader>
          <DialogTitle className="relative w-full  text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <LucideAlertTriangle
                  size={26}
                  className="stroke-white dark:stroke-brand-blue-120 fill-brand-red-80"
                />
              </div>
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Not Enough Buying Power
                </p>
              </div>
            </div>
            <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="mt-4">
              <div className="text-brand-gray-60 dark:text-brand-gray-30 font-normal text-left">
                You don’t have enought buying power in your brokerage account to
                place this order
              </div>
              <div className="flex flex-col mt-4">
                <Dialoge.Close asChild>
                  <Button
                    variant="default"
                    className="w-full h-[48px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize mr-[20px]"
                  >
                    Make Deposit
                  </Button>
                </Dialoge.Close>
                <Dialoge.Close asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-[45px] mt-[10px] border border-brand-green-40 rounded-[10px] font-[550] capitalize mr-[20px]"
                  >
                    Dismiss
                  </Button>
                </Dialoge.Close>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default BuyingPowerModal
