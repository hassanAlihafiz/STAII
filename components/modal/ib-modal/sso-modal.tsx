"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import "@/async-functions/account"
import { createUserSSO } from "@/async-functions/account/ib"
import { useAppDispatch, useAppSelector } from "@/store"
import { toggleRedirectModal } from "@/store/slices/app-slice"
import { showPassword } from "@/store/slices/user-slice"
import { AlertCircle, Clipboard, ExternalLink, RefreshCcw } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CountDownTimer from "@/components/common/timer/count-down"

import "@/styles/common-page.css"

interface UserSSOModalProps {
  name: String
}
const UserSSOModal: React.FC<UserSSOModalProps> = ({ name }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [redirectLink, setRedirectLink] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const password = useAppSelector((state) => state.user.ibAccount?.password)
  const username = useAppSelector((state) => state.user.ibAccount?.username)
  const showPass = useAppSelector((state) => state.user.showPassword)
  const isModal = useAppSelector((state) => state?.app.showRedirectModal)

  const createUserSession = async () => {
    setIsLoading(true)
    const data = await createUserSSO(username || "")
    if (data) {
      setRedirectLink(data?.data)
    }
    setIsLoading(false)
  }
  const handleCopyClick = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setIsCopied(true)
    dispatch(showPassword(false))
  }

  useEffect(() => {
    if (isModal) {
      createUserSession()
    }
  }, [isModal])

  return (
    <Dialog
      open={isModal}
      onOpenChange={() => dispatch(toggleRedirectModal(false))}
    >
      <AsyncButton
        onClick={() => dispatch(toggleRedirectModal(true))}
        className={`w-fit`}
        variant={"default"}
      >
        Launch Trading Platform
      </AsyncButton>

      <DialogContent className="dark:border-[#2D374E] dark:bg-[#202A41] outline-none focus:outline-none modal-responsive">
        <DialogHeader>
          <DialogTitle>Redirect to Trading Platform</DialogTitle>
          <DialogDescription>
            {isLoading ? (
              "Creating one time session...."
            ) : redirectLink ? (
              <>
                Session Expires in (
                <CountDownTimer
                  start={redirectLink ? true : false}
                  initialValue={60}
                  onEnd={() => {
                    setRedirectLink(null)
                    setIsCopied(false)
                  }}
                />
                &nbsp;secs), Hit Continue Now
              </>
            ) : (
              "Please,try regenerating session Again."
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full place-items-center p-4">
          {isLoading && (
            <div
              className="spin-loader h-14 w-14 border-4  text-primary-foreground"
              role="status"
            />
          )}
        </div>

        {password && showPass ? (
          <div
            className="input flex items-center justify-between bg-gray-100 border-none outline-none cursor-pointer"
            onClick={() => handleCopyClick()}
          >
            {password}
            <span className=" mr-3 text-primary-foreground transition-all">
              {isCopied ? (
                "Copied!"
              ) : (
                <Clipboard className="w-4 text-black dark:text-white" />
              )}
            </span>
          </div>
        ) : (
          <></>
        )}
        {/* {!isCopied && showPass ? (
          <Alert className="border dark:border-[#2D374E] bg-transparent text-gray-800 dark:text-white ">
            <AlertCircle className="h-4 w-4 !text-gray-800 dark:!text-white " />
            <AlertTitle>Copy Password</AlertTitle>
            <AlertDescription className="text-gray-500 dark:text-white">
              You will not be allowed to proceed without Password.
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )} */}

        {redirectLink && !isLoading ? (
          <Link href={redirectLink || ""} target="_blank">
            <Button disabled={isLoading}>
              Continue <ExternalLink className="w-4 ml-2 h-4" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              createUserSession()
            }}
            disabled={isLoading}
          >
            Regenerate session
            <RefreshCcw className="w-4 ml-2 h-4" />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UserSSOModal
