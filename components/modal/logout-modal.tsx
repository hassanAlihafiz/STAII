"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/async-functions/account"
import { useAppDispatch, useAppSelector } from "@/store"
import { setShowLogout } from "@/store/slices/user-slice"
import { useQuilttSession } from "@quiltt/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import AsyncButton from "../ui/async-btn"
import { toast } from "../ui/use-toast"

export function LogoutModal() {
  const supabase = createClientComponentClient()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { revokeSession } = useQuilttSession()

  const showLogout = useAppSelector((state) => state.user.showLogout)
  const [isLoading, setIsLoading] = useState(false)
  const handleLogout = async () => {
    setIsLoading(true)
    revokeSession()
    const logout = await logoutUser(supabase)(dispatch)
    if (!logout) return setIsLoading(false)
    router.push("/login")
    setTimeout(() => {
      location.reload()
    }, 900)
  }
  return (
    <AlertDialog open={showLogout}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will terminate your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              dispatch(setShowLogout(false))
            }}
          >
            Cancel
          </Button>
          <AsyncButton
            loading={isLoading}
            variant="destructive"
            onClick={() => handleLogout()}
          >
            Logout
          </AsyncButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
