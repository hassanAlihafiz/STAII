"use Client"

import React from "react"
import { Check } from "lucide-react"

import "@/styles/common-page.css"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

interface ConfirmOrderProps {
  open?: boolean
  setOpen?: any
  sharesType: string
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  open,
  setOpen,
  sharesType,
}) => {
  const router = useRouter()
  const params = useParams()
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="modal-section max-md:!rounded-none max-md:justify-center">
        <div className="max-md:h-[96vh] ">
          <DialogHeader className="max-md:h-full max-md:flex max-md:justify-center">
            <DialogDescription className="w-full">
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <div className="flex justify-center">
                      <Check size={80} color="#069D6E" strokeWidth={3} />
                    </div>
                    <div className="black-600 text-lg dark:text-white max-md:text-2xl">
                      {sharesType?.toUpperCase()} Order Queued{" "}
                    </div>
                  </div>
                  <div className="text-brand-gray-60 text-sm text-center dark:text-brand-gray-30 max-md:mt-2">
                    Your order to sell 10 share(s) of CCIV will be when markets
                    open
                  </div>
                  <div className="w-full flex-center-between mt-4 max-md:mt-10">
                    <div className="black-600 text-sm dark:text-white">
                      Number of Shares
                    </div>
                    <div className="black-600 text-sm dark:text-white">
                      0 of 10
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-brand-gray-20 my-2 dark:bg-brand-blue-90"></div>
                  <div className="w-full flex-center-between ">
                    <div className="black-600 text-sm dark:text-white">
                      Estimated Credit
                    </div>
                    <div className="black-600 text-sm dark:text-white">
                      $300.00
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col mt-8 gap-3 max-md:relative max-md:top-32">
                  <div className="md:hidden h-[1px] w-full bg-brand-gray-20 my-4 max-md:w-screen max-md:-mx-4 dark:bg-brand-blue-90"></div>
                  <Button
                    className="rounded-[10px]"
                    onClick={() => router.push(`/script/${params?.name}`)}
                  >
                    Done
                  </Button>
                  <Button className="rounded-[10px]" variant="ghost">
                    View Order
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmOrder
