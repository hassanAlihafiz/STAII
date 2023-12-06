"use client"

import React from "react"

import "@/styles/common-page.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DialogClose } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"

interface TransitionCompletedProps {
  open: boolean
  setOpen: (value: boolean) => void
  description?: string
  title: string
  onClick?: () => void
}

const TransitionCompleted = ({
  open,
  setOpen,
  title,
  description,
}: TransitionCompletedProps) => {
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="px-4 py-5 rounded-[15px] h-[auto] sm:max-w-[400px] transition-payment-responsive">
        <DialogDescription className="w-full">
          <div className="max-md:flex-center-between max-md:flex-col max-md:h-full ">
            <div className="max-md:flex max-md:flex-col max-md:h-full max-md:justify-center">
              <div className="flex justify-center">
                <Image
                  src="/icons/waiting-hour-glass-icon.svg"
                  width={90}
                  height={90}
                  alt=""
                  className="max-md:w-28"
                />
              </div>
              <div className="flex flex-col items-center mt-3">
                <div>
                  <h3 className="black-xl-600 dark:text-white">{title}</h3>
                </div>
                <div className="mt-1 px-6 black-400 text-center text-sm dark:text-brand-gray-30">
                  {description}
                </div>
              </div>
            </div>
            <div>
              <div className="mt-8 mb-6 text-brand-gray-60 text-center text-xs dark:text-brand-gray-50 px-5">
                Please make sure to maintain a balance of $100.00 in your bank
                account until the funds are deducted to avoid any issues
              </div>
              <DialogClose className="w-full">
                <Button
                  onClick={() => router.push("/transfer")}
                  variant="default"
                  className="h-11 rounded-lg border border-[#C1F0DB] dark:border-none"
                >
                  Done
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default TransitionCompleted
