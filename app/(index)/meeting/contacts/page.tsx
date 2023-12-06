"use client"

import React, { useEffect, useState } from "react"

import { StackTable } from "@/components/ui/stack-table"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { contactColumns } from "@/utils/contact-columns"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import BackBtn from "@/components/ui/back-button"
import Pagination from "@/components/ui/pagination"
import { toast } from "@/components/ui/use-toast"
import EmailBookmark from "@/components/modal/meeting/email-bookmark"

export default function Contacts() {
  const [loader, setLoader] = useState(false)
  const [contacts, setContacts] = useState<any | []>([])
  const supabase = createClientComponentClient()
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const userId = useAppSelector((state) => state?.user?.profile?.uid)

  useEffect(() => {
    getUserContacts()
  }, [])

  const getUserContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("user_contacts")
        .select("*")
        .eq("userID", userId)
      if (data) {
        setContacts(data)
        setLoader(true)
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
      <div className="flex  items-center justify-between border-b border-brand-gray-20 dark:border-brand-blue-90 pb-3">
        <div className="flex justify-between gap-4">
          <BackBtn />
          <h1 className="font-semibold">Contacts</h1>
        </div>
        <div>
          <EmailBookmark getContacts={getUserContacts} />
        </div>
      </div>
      {loader && (
        <>
          <StackTable
            columns={contactColumns(getUserContacts)}
            data={dataPerPage}
          />
          <Pagination
            data={contacts}
            totalData={contacts?.length}
            setDataPerPage={setDataPerPage}
          />
        </>
      )}
    </div>
  )
}
