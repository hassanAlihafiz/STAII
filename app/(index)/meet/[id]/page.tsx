"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getMeetingType } from "@/async-functions/account"
import { useAppSelector } from "@/store"
import { callPostApi } from "@/utils/api"
import { DyteMeeting } from "@dytesdk/react-ui-kit"
import { useDyteClient } from "@dytesdk/react-web-core"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { toast } from "@/components/ui/use-toast"

export default function Meeting({ params }: { params: { id: string } }) {
  const [meeting, initMeeting] = useDyteClient()
  const [token, setToken] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  const search = searchParams.get("authToken")
  const [initialRender, setInitialRender] = useState(false)
  const user = useAppSelector((state) => state?.user?.profile?.uid)

  const AddParticipants = (preset: string) => {
    callPostApi(
      "dyte",
      `meetings/${params?.id}/participants`,
      {
        preset_name: preset,
        custom_participant_id: Math.random().toString(36).substring(7),
      },
      (e) => {
        setToken(e?.data?.token)
      },
      (err) => {
        toast({
          variant: "destructive",
          title: "Unable to add participant",
          description: err,
        })
      }
    )
  }

  const meetings = async () => {
    const result = await getMeetingType(params?.id)(supabase)
    if (result !== null) {
      console.log("Preset Name:", result)
      AddParticipants(result)
    } else {
      toast({
        variant: "destructive",
        title: "Preset name",
        description: "Unable to fetch the preset name",
      })
    }
  }

  useEffect(() => {
    if (initialRender) {
      if (params && search) {
        const newUrl = `/meet/${params?.id}`
        router.replace(newUrl, undefined)
        setToken(search)
      } else {
        meetings()
      }
    } else {
      setInitialRender(true)
    }
  }, [params, search, initialRender])

  useEffect(() => {
    if (token) {
      initMeeting({
        authToken: token,
      })
    }
  }, [token])

  return meeting ? (
    <DyteMeeting meeting={meeting} />
  ) : (
    <div className="flex justify-center items-center h-[48vh]">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}
