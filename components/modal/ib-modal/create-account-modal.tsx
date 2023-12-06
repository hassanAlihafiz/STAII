"use client"

import { useEffect, useState } from "react"

import "@/async-functions/account"
import { useRouter } from "next/navigation"
import { createUserIBAccount } from "@/async-functions/account/ib"
import { useAppDispatch, useAppSelector } from "@/store"
import { showPassword } from "@/store/slices/user-slice"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

export default function CreateIBAccountModal({
  open,
  setIsOpen,
}: {
  open: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const supabase = createClientComponentClient()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const profile = useAppSelector((state) => state.user.profile)
  const ibDetails = useAppSelector((state) => state.user.ibAccount)
  const [isLoading, setIsLoading] = useState(true)

  const createUsersBrokerAccount = async () => {
    setIsLoading(true)

    if (ibDetails) {
      return router.push("/home")
    }
    if (profile) {
      if (
        !profile.country_of_birth ||
        !profile.tax_residence_country ||
        !profile.date_of_birth
      ) {
        router.push("/sign-up/verification")
        setIsOpen(false)

        return toast({
          title: "Please complete your profile",
          description:
            "You need to complete your profile before you can create an  account",
          variant: "default",
        })
      }
      const { data } = await createUserIBAccount(profile)(supabase, dispatch)
      if (data) {
        dispatch(showPassword(true))
        return router.push("/home")
      }
      setIsOpen(false)
    }
  }
  useEffect(() => {
    if (open && profile) createUsersBrokerAccount()
  }, [open, profile])

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="dark:border-[#2D374E] dark:bg-[#202A41] outline-none focus:outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Creating your Account with Partner Broker
          </AlertDialogTitle>
          <AlertDialogDescription>
            sit tight it can take a few minutes....
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full place-items-center p-4">
          {isLoading && (
            <div
              className="spin-loader h-14 w-14 border-4  text-primary-foreground"
              role="status"
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
