"use client"

import React, { useEffect, useState } from "react"
import { meetingColumns } from "@/utils/meeting-columns"

import { StackTable } from "@/components/ui/stack-table"

import "@/styles/common-page.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { callGetApi } from "@/utils/api"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { toast } from "@/components/ui/use-toast"
import CreateMeetingModal from "@/components/modal/meeting/create-meeting"

export default function Meeting() {
  const route = useRouter()
  const [loader, setLoader] = useState(false)
  const [meeting, setMeetings] = useState([])
  const [userMeetings, setUserMeetings] = useState<any | []>([])
  const supabase = createClientComponentClient()
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const user_id = useAppSelector((state) => state?.user?.profile?.uid)
  const getMeetings = () => {
    callGetApi(
      "dyte",
      "/meetings",

      (e) => {
        const meetingId = userMeetings?.map((e: any) => e?.meeting)
        const matchingObjects = e?.data.filter((obj: any) =>
          meetingId.includes(obj.id)
        )

        const meetingsWithArchive = matchingObjects.map((obj: any) => ({
          ...obj,
          archive: userMeetings.find(
            (meeting: any) =>
              meeting.meeting === obj.id && meeting?.archive === false
          ).archive,
        }))
        setMeetings(meetingsWithArchive)
        setLoader(true)
      },
      (err) => {
        toast({
          variant: "destructive",
          title: "Unable to fetch meetings",
          description: err,
        })
      }
    )
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  useEffect(() => {
    if (userMeetings) {
      getMeetings()
    }
  }, [userMeetings])

  const fetchAllData = async () => {
    try {
      const { data, error } = await supabase
        .from("dyte_meetings")
        .select("*")
        .eq("user_id", user_id)
        .eq("archive", false)
      if (data) {
        setUserMeetings(data)
      }
      if (error) {
        toast({
          variant: "destructive",
          title: "Unable to fetch meetings",
          description: error?.message,
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  return (
    <div className="w-full max-w-[770px] m-[auto] pb-[70px] mt-11 flex flex-col overflow-hidden max-md:px-5">
      <div className="flex  items-center justify-between  pb-3 max-md:flex max-md:flex-col max-md:gap-3">
        <div>
          <h1 className="font-semibold">Meetings</h1>
        </div>
        <div className="flex justify-between gap-5">
          <CreateMeetingModal getMeeting={fetchAllData} />
          <div>
            <Button
              onClick={() => route.push("/meeting/contacts")}
              className="h-10"
            >
              Contacts
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-brand-gray-20 dark:border-brand-blue-90">
        <Link href={"/meeting/archive"}>
          <h1 className="font-medium underline text-blue-600">Archive</h1>
        </Link>
      </div>
      {loader && (
        <>
          <StackTable
            columns={meetingColumns(fetchAllData)}
            data={dataPerPage}
          />
          <Pagination
            data={meeting}
            totalData={meeting?.length}
            setDataPerPage={setDataPerPage}
          />
        </>
      )}
    </div>
  )
}
