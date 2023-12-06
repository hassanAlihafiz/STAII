"use client"

import { ColumnDef } from "@tanstack/react-table"

import { EditContactModal } from "@/components/modal/meeting/edit-contact"

import timeAgo from "./time-ago"

export type ContactColumns = {
  id: string
  Name: string
  Email: string
  Company: string
  userID: string
}
interface ContactColumnsProps {
  getUserContacts: () => Promise<void>
}

export const contactColumns = (
  getUserContacts: ContactColumnsProps["getUserContacts"]
): ColumnDef<ContactColumns>[] => [
  {
    id: "1",
    accessorKey: "Name",
    header: () => {
      return <div className="flex gap-2 items-center">Name</div>
    },
  },
  {
    id: "2",
    accessorKey: "Email",
    header: () => {
      return <div className="flex gap-2 items-center">Email</div>
    },
  },
  {
    id: "3",
    accessorKey: "Company",
    header: () => {
      return <div className="flex gap-2 items-center w-16">Company Name</div>
    },
  },
  {
    id: "4",
    accessorKey: "Company",
    header: () => {
      return <div className="flex gap-2 items-center">Actions</div>
    },
    cell: ({ row }) => {
      return (
        <EditContactModal data={row?.original} getContacts={getUserContacts} />
      )
    },
  },
]

