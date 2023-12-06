"use client"

import React, { useEffect, useState } from "react"
import * as Dialoge from "@radix-ui/react-dialog"

import "@/styles/common-page.css"
import { useRouter } from "next/navigation"
import {
  createMeetingLinkWithToken,
  getMeetingType,
} from "@/async-functions/account"
import { useAppSelector } from "@/store"
import { callGetApi, callPostApi } from "@/utils/api"
import { DialogClose } from "@radix-ui/react-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Copy, LucideAlertTriangle, X } from "lucide-react"

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
import { InputInsideLabel } from "@/components/ui/input-inside-label"

import { toast } from "@/components/ui/use-toast"

interface JoinMeetingModalProps {
  id: string
}

const JoinMeetingModal: React.FC<JoinMeetingModalProps> = ({ id }) => {
  const [showLink, setShowLink] = useState(true)
  const [meetingUrl, setMeetingUrl] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const supabase = createClientComponentClient()
  const user = useAppSelector((state) => state?.user?.profile)

  const GenerateLink = async (redirect: boolean = false) => {
    const result = await getMeetingType(id, true)(supabase)
    if (result !== null) {
      console.log("Preset Name:", result)
      const data = {
        name: user?.name,
        picture: user?.profile_url,
        preset_name: result,
        custom_participant_id: user?.uid,
      }
      callPostApi(
        "dyte",
        `meetings/${id}/participants`,
        data,
        (e) => {
          if (redirect) {
            window.open(createMeetingLinkWithToken(id, e?.data?.token))
            setIsOpen(false)
          } else {
            setMeetingUrl(createMeetingLinkWithToken(id, e?.data?.token))
            setShowLink(false)
          }
        },
        (err) => {
          toast({
            variant: "destructive",
            title: "Unable to add participants",
            description: err,
          })
        }
      )
    } else {
      toast({
        variant: "destructive",
        title: "Preset name",
        description: "Unable to fetch the preset name",
      })
    }
  }

  const handleCopyClick = () => {
    const urlInput = document.getElementById("meetingUrl")
    if (urlInput instanceof HTMLInputElement) {
      urlInput.select()
      document.execCommand("copy")
      setCopied(true)
    }
  }

  const onClose = (e: any) => {
    setIsOpen(e)
    setShowLink(true)
    setMeetingUrl("")
    setCopied(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-10"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Join
        </Button>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Join Meeting
                </p>
              </div>
            </div>
            <DialogClose
              className="absolute -top-3 right-0 mt-2 outline-none"
              onClick={onClose}
            >
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="pt-[10px]">
              <div className="flex gap-5 flex-col text-brand-gray-60 dark:text-brand-gray-30 font-normal text-left">
                <div>
                  <InputInsideLabel
                    inputLabel="Username"
                    className="h-10"
                    labelClass="!text-left !top-1"
                    value={user?.name}
                    disabled={!!user?.name}
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-[20px]">
                {showLink && !meetingUrl ? (
                  <>
                    <AsyncButton
                      variant="default"
                      className="w-full h-10 border border-brand-green-40 dark:border-transparent rounded-lg font-[550] capitalize "
                      onClick={() => GenerateLink(true)}
                    >
                      Join Now
                    </AsyncButton>
                    <AsyncButton
                      variant="ghost"
                      className="w-full h-10 border border-brand-green-40 rounded-lg font-[550] capitalize"
                      onClick={() => GenerateLink()}
                    >
                      Generate Link
                    </AsyncButton>
                  </>
                ) : (
                  <div className="flex w-full">
                    <input
                      id="meetingUrl"
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-l focus:outline-none"
                      placeholder="Enter URL"
                      value={meetingUrl}
                    />
                    <div
                      onClick={handleCopyClick}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r focus:outline-none"
                    >
                      <Copy />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default JoinMeetingModal
