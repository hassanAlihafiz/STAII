"use client"

import React, { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { ArrowLeftCircle, Bell, X } from "lucide-react"

import "@/styles/common-page.css"
import Image from "next/image"
import { useAppSelector } from "@/store"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ConfirmUnsubscribe from "../confirm-unsubscribe"

interface MonthlyTransferAmountProps {
  open: boolean
  setOpen: any
}
const MonthlyTransferAmount: React.FC<MonthlyTransferAmountProps> = ({
  open,
  setOpen,
}) => {
  const [currentSellType, setCurrentSellType] = useState<any>(0)
  const [isOpen, setIsOpen] = useState(false)
  const accounts = useAppSelector((state) => state.bank.accounts)
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          setOpen(e)
        }}
      >
        <DialogContent className="modal-section modal-responsive sm:!max-w-[400px] max-md:!h-full max-md:!rounded-none">
          <DialogHeader>
            <DialogTitle className="relative w-full pb-6 text-left dark:text-white max-md:flex">
              <div className="max-md:hidden flex items-center">
                <div className="flex gap-2 items-center">
                  <div className="black-600 text-base dark:text-white">
                    Monthly Transfer Amount
                  </div>
                </div>
                <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
                  <X className="ml-auto w-5 cursor-pointer text-[#9CA5AF]" />
                </DialogClose>
              </div>
              {/* mobile view */}
              <div className="md:hidden flex items-center justify-between z-10">
                <DialogClose>
                  <ArrowLeftCircle
                    strokeWidth={"0.5px"}
                    size={"35px"}
                    className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                  />
                </DialogClose>
              </div>
              <div className="md:hidden max-md:flex  max-md:justify-center max-md:items-center max-md:gap-2 max-md:w-full">
                <span className="black-600 text-base dark:text-white">
                  Monthly Transfer Amount
                </span>
              </div>

              {/* mobile view */}
            </DialogTitle>
            <DialogDescription className="w-full">
              <div className="flex flex-col justify-center items-center">
                <div className="w-full"></div>
                <div className={"mt-7"}>
                  <InputInsideLabel
                    inputLabel=""
                    className="pl-0 text-gray-brand-100 border-none price-input text-center text-[40px] dark:bg-transparent font-semibold focus:!shadow-none focus:!border-0"
                    placeholder="0.00"
                    sign="$"
                    labelClass="w-full text-center -top-4 !left-0"
                    value={currentSellType}
                    onChange={(e) => setCurrentSellType(e?.target.value)}
                  />
                </div>
                <div className="mt-5 w-full max-md:mt-28">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your Bank Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {accounts?.map((acc, i) => (
                          <SelectItem value={acc.account_no}>
                            {acc.bank_name}({acc.account_no})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full mt-7">
                  <Button
                    className="rounded-xl"
                    onClick={() => {
                      setOpen(false)
                      setIsOpen(true)
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ConfirmUnsubscribe open={isOpen} setOpen={setIsOpen} />
    </>
  )
}

export default MonthlyTransferAmount
