import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"

const SubscribedModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: any
}) => {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="modal-section modal-responsive focus:outline-none max-md:!h-full max-md:flex max-md:flex-col max-md:justify-between max-md:dark:!bg-brand-dark-bg max-md:!rounded-t-none">
        <div className="flex flex-col justify-center items-center gap-3 max-md:h-full">
          <Image
            className="w-20 h-20 rounded-full max-md:w-32 max-md:h-32"
            src="/images/market/green-check.svg"
            width={80}
            height={80}
            alt=""
          />
          <div className="black-600 dark:text-white max-md:text-2xl max-md:text-center">
            You subscribed to Growth Financial
          </div>
          <div className="text-brand-gray-60 dark:text-brand-gray-30 text-sm mb-4 text-center">
            You can manage subscriptions in account menu in section “My
            subscriptions”
          </div>
        </div>
        <DialogFooter className="flex !flex-col gap-3 max-md:border-t max-md:border-brand-gray-20 max-md:dark:border-brand-blue-90">
          <Button
            onClick={() => router.push("/market/robo-funds")}
            className="rounded-lg text-base font-semibold"
          >
            Done
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="rounded-lg !ml-0 text-base font-semibold"
            variant="ghost"
          >
            Manage Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SubscribedModal
