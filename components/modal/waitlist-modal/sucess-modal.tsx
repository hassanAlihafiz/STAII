"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SuccessModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Function
}) {
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 0) {
      setOpen(false)
    }
  }, [count])
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border-none p-8 dark:bg-[#232736] sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex w-full items-center justify-center pt-4 ">
            <Image
              src="/icons/check-bold.svg"
              width={64}
              height={64}
              alt="logo"
            />
          </div>
          <AlertDialogTitle>
            <h2 className=" title mb-0 w-full text-center text-xl">
              Thanks! Your request sent
            </h2>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text mb-3 w-full text-center">
              We will contact you soon. This message wil close automatically in
              &nbsp;{count > -1 ? count : "0"}s…
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <button
            className="btn w-full "
            onClick={() => {
              setOpen(false)
            }}
          >
            Done
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
