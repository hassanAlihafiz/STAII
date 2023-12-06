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

const AccountDeletionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex text-brand-red-70 text-base font-medium">
          Delete My Account
        </div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <LucideAlertTriangle
                  size={26}
                  className="stroke-white dark:stroke-brand-blue-120 fill-brand-red-80"
                />
              </div>
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Delete Account
                </p>
              </div>
            </div>
            <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="pt-[10px]">
              <div className="text-brand-gray-60 dark:text-brand-gray-30 font-normal text-left">
                <div>
                  <p className="text-[15px]">
                    To delete your SocialTradeAI account, please be aware:{" "}
                  </p>
                </div>
                <div className="mx-5 mt-2">
                  <ul className="list-disc">
                    <li className="pb-[2px]">
                      All personal data like your diamonds/ watchlist/portfolio
                      will be deleted and cannot be recovered.
                    </li>
                    <li>
                      Your request will be processed within 2-5 business days.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col pt-[20px]">
                <Dialoge.Close asChild>
                  <Button
                    variant="default"
                    className="w-full h-[48px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize mr-[20px]"
                  >
                    Cancel
                  </Button>
                </Dialoge.Close>
                <Dialoge.Close asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-[45px] mt-[10px] border border-brand-green-40 rounded-[10px] font-[550] capitalize mr-[20px]"
                  >
                    Confirm
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

export default AccountDeletionModal
