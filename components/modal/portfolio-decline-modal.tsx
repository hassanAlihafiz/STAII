import { DialogClose } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PortfolioDeclineModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mb-6 h-fit w-fit text-base font-semibold text-[#6A7381] outline-none dark:text-[#EDEEF3]">
          Decline Plan
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] outline-none border-none bottom-0  lg:bottom-auto">
        <DialogHeader>
          <DialogTitle className="form-title mb-1 w-full text-center">
            Decline personalized portfolio?
          </DialogTitle>
          <DialogDescription className="  max-w-[360px] text-center text-sm text-[#6A7381]">
            You will not be able to get another personalized portfolio until 6
            month waiting period
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 flex w-full flex-col space-y-3">
          <Button variant="ghost" className="text-base font-semibold">
            Decline Plan
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" className="text-base font-semibold">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
