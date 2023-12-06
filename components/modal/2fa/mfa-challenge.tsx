"use client"

import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import "@/async-functions/account"
import { useRouter } from "next/navigation"
import {
  toggelMfaChallenge,
  toggelMfaEnrollment,
} from "@/store/slices/app-slice"
import { setShowLogout } from "@/store/slices/user-slice"
import { AlertCircle, ShieldCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ChallengeMfa = () => {
  const supabase = createClientComponentClient()
  const [verifyCode, setVerifyCode] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const showMfaChallenge = useAppSelector((state) => state.app.showMfaChallenge)
  const showMfaEnrollment = useAppSelector(
    (state) => state.app.showMfaEnrollment
  )
  const factorId = useAppSelector((state) => state.app.mfaFactorId)
  const handleError = (error: any) => {
    setLoading(false)
    console.error(error)
    toast({
      title: "Error!",
      description: error.message || error,
      variant: "destructive",
    })
  }
  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (verifyCode.length !== 6)
      return toast({
        title: "Error!",
        description: "Please enter a valid code",
        variant: "destructive",
      })
    if (!factorId) return
    setLoading(true)
    const challenge = await supabase.auth.mfa.challenge({ factorId })
    if (challenge.error) {
      return handleError(challenge.error)
    }

    const challengeId = challenge.data.id

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: verifyCode?.toString(),
    })
    if (verify.error) {
      return handleError(verify.error)
    }
    toast({
      title: "Success!",
      description: "Two factor authentication enabled",
      variant: "success",
    })

    setLoading(false)
    dispatch(toggelMfaChallenge(false))
  }

  const handleBack = async (value?: "logout" | "back") => {
    if (value === "logout") return dispatch(setShowLogout(true))
    if (value === "back") {
      dispatch(toggelMfaEnrollment("must"))
      return dispatch(toggelMfaChallenge(false))
    }
    dispatch(toggelMfaChallenge(false))
    dispatch(toggelMfaEnrollment("optional"))
  }
  const handlePushBack = async () => {
    router.back()
    dispatch(toggelMfaChallenge(false))
  }
  return (
    <AlertDialog
      open={showMfaChallenge ? true : false}
      onOpenChange={() => {
        if (showMfaChallenge === "must") return
        dispatch(toggelMfaChallenge(false))
      }}
    >
      <AlertDialogContent className="form-container h-fit">
        <AlertDialogHeader>
          <AlertDialogTitle className="form-title mb-1">
            Enter Authenticator code
          </AlertDialogTitle>

          <AlertDialogDescription className="form-text  mb-3 mt-0 ">
            Type the code created by the authenticater app used to scan the QR
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="w-full" onSubmit={(e) => onSubmit(e)}>
          {showMfaChallenge === "must" ? (
            <Alert className="border border-destructive mb-4 bg-transparent text-gray-800 dark:text-white ">
              <AlertCircle className="h-4 w-4 !text-destructive " />
              <AlertTitle className="text-destructive"> Alert</AlertTitle>
              <AlertDescription className="text-destructive ">
                You will not be allowed to proceed without the code.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border dark:border-[#2D374E] bg-transparent mb-8 text-gray-800 dark:text-white ">
              <ShieldCheck className="h-4 w-4 !text-gray-800 dark:!text-white " />
              <AlertTitle>Fun Fact</AlertTitle>
              <AlertDescription className="text-gray-500 dark:text-white">
                Enabling Multi-Factor Authentication (MFA) on your account makes
                it up to 99.9%* more difficult for hackers to crack. It&apos;s
                like adding an extra layer of armor to your digital identity!
              </AlertDescription>
            </Alert>
          )}
          <Input
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="Enter code"
            className="text-lg"
            type="number"
            required
          />

          <AlertDialogFooter className="mt-8">
            {showMfaChallenge !== "must" || showMfaEnrollment === false ? (
              <Button
                variant="outline"
                className="mr-4"
                type="button"
                onClick={() => handleBack("back")}
              >
                Scan Again
              </Button>
            ) : (
              <Button
                variant="outline"
                className="mr-4 "
                type="button"
                onClick={() => handlePushBack()}
              >
                Go Back
              </Button>
            )}
            <AsyncButton loading={loading} type="submit">
              Submit
            </AsyncButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ChallengeMfa
