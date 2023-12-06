"use client"

import React from "react"

import "@/styles/common-page.css"
import Image from "next/image"
import { DialogClose } from "@radix-ui/react-dialog"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentfailedProps {
  loading?: boolean
  handleSumbitWithDrawClick?: () => void
}

const PaymentFailedModal: React.FC<PaymentfailedProps> = ({
  loading,
  handleSumbitWithDrawClick,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex text-brand-red-70 text-base font-medium">
          <AsyncButton
            loading={loading}
            onClick={handleSumbitWithDrawClick}
            text="Submit Withdraw"
            className="w-full h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
          />
        </div>
      </DialogTrigger>
      <DialogContent className="px-4 py-5 rounded-[15px] h-[auto] sm:w-[400px] sm:max-w-[600px] transition-payment-responsive">
        <DialogDescription className="w-full">
          <div className="pt-[10px] max-md:flex-center-between max-md:flex-col max-md:h-full ">
            <div className="max-md:flex max-md:flex-col max-md:h-full max-md:justify-center">
              <div className="flex justify-center">
                <Image
                  src="/icons/Prohibit.svg"
                  width={90}
                  height={90}
                  alt=""
                  className="max-md:w-28"
                />
              </div>
              <div className="flex flex-col items-center mt-3">
                <div>
                  <h3 className="black-xl-600 dark:text-white">
                    Payment failed
                  </h3>
                </div>
                <div className="mt-1 px-[12px]">
                  <p className="black-400 text-center text-sm dark:text-white">
                    Not enought money
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-5">
                <DialogClose className="w-full">
                  <Button
                    variant="default"
                    className="h-14 rounded-lg border border-[#C1F0DB] dark:border-none"
                  >
                    Try again
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentFailedModal
