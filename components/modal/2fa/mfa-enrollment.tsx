"use client"

import { useEffect, useState } from "react"

import "@/async-functions/account"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  setMfaFactorId,
  toggelMfaChallenge,
  toggelMfaEnrollment,
} from "@/store/slices/app-slice"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Clipboard } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

export default function MfaEnrollment() {
  const supabase = createClientComponentClient()
  const [isCopied, setIsCopied] = useState(false)
  const [error, seterror] = useState<null | string>(null)
  const [mfa, setMfa] = useState<{
    qr: null | string
    code: null | string
  }>({
    qr: null,
    code: null,
  })
  const factorId = useAppSelector((state) => state.app.mfaFactorId)
  const showMfaEnrollment = useAppSelector(
    (state) => state.app.showMfaEnrollment
  )
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleCopyClick = () => {
    if (!mfa?.code) return
    navigator.clipboard.writeText(mfa.code)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }
  useEffect(() => {
    ;(async () => {
      if (mfa.qr || !showMfaEnrollment) return
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      })
      if (error) return seterror(error?.message)

      dispatch(setMfaFactorId(data.id))
      setMfa({
        qr: data.totp.qr_code,
        code: data.totp.secret,
      })
    })()
  }, [showMfaEnrollment])

  const handleNext = () => {
    dispatch(toggelMfaEnrollment(false))
    dispatch(
      toggelMfaChallenge(showMfaEnrollment === "must" ? "must" : "optional")
    )
  }
  const unenrollFactor = async () => {
    if (!factorId) return
    console.log("unenrollFactor")
    try {
      const { data, error } = await supabase.auth.mfa.unenroll({
        factorId: factorId,
      })
      console.log(data, error)
      if (error) {
        console.error(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleBack = async (push?: boolean) => {
    await unenrollFactor()
    dispatch(toggelMfaEnrollment(false))
    if (push) router.back()
  }
  console.log(showMfaEnrollment)
  return (
    <AlertDialog
      open={showMfaEnrollment ? true : false}
      onOpenChange={(value) => {
        if (showMfaEnrollment === "must") return
        handleBack()
      }}
    >
      <AlertDialogContent className="form-container h-fit">
        <AlertDialogHeader>
          <AlertDialogTitle className="form-title">
            Add Two Factor Authentication
          </AlertDialogTitle>

          <AlertDialogDescription className="form-text  mb-2">
            Scan the QR code below with an authentication application on your
            phone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full">
          <div className="  w-fit relative mx-auto  my-4 mb-8 p-2 bg-white grid place-items-center">
            <Image
              src={mfa?.qr || ""}
              alt="QR Code"
              width={240}
              height={240}
              className="mx-auto my-auto"
              style={error ? { background: "grey" } : {}}
            />
          </div>
          <AlertDialogDescription className="form-text my-2 ">
            If you can&apos;t scan the image, enter this code instead:
          </AlertDialogDescription>
          {mfa?.code && (
            <div
              className="input flex items-center justify-between bg-gray-100 border-none outline-none cursor-pointer "
              onClick={() => handleCopyClick()}
            >
              {mfa?.code}
              <span className=" mr-3 text-primary-foreground transition-all">
                {isCopied ? (
                  "Copied!"
                ) : (
                  <Clipboard className="w-4 text-black dark:text-white" />
                )}
              </span>
            </div>
          )}
        </div>
        {showMfaEnrollment === "must" || error ? (
          <Alert className="border border-destructive  bg-transparent text-gray-800 dark:text-white -mb-4">
            <AlertCircle className="h-4 w-4 !text-destructive " />
            <AlertTitle className="text-destructive">
              {" "}
              {error ? "Error!" : "Alert"}
            </AlertTitle>
            <AlertDescription className="text-destructive ">
              {error || "You will not be allowed to proceed without the code."}
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
        <AlertDialogFooter className="mt-6">
          {showMfaEnrollment === "optional" ? (
            <Button
              variant="outline"
              className="mr-4"
              onClick={() => handleBack()}
            >
              Do it later
            </Button>
          ) : (
            <Button
              variant="outline"
              className="mr-4"
              onClick={() => handleBack(true)}
            >
              Go Back
            </Button>
          )}
          <AsyncButton onClick={() => handleNext()}>Continue</AsyncButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
