"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Switch } from "@/components/ui/switch"
import ToggleSwitch from "@/components/ui/toggle-switch"
import CalendarDrawer from "@/components/drawer/calendar-drawer"
import ArchiveToggle from "@/components/meeting/archive-toggle"
import JoinMeetingModal from "@/components/modal/meeting/join-meeting"
import ShareMeetingModal from "@/components/modal/meeting/share-meeting"

import timeAgo from "./time-ago"

export type MeetingColumns = {
  id: string
  title: string
  preferred_region?: string
  created_at: string
  record_on_start?: boolean
  updated_at?: string
  live_stream_on_start?: boolean
  status: string
  archive: boolean
}
interface MeetingColumnsProps {
  getEmails: () => Promise<void>
}

export const meetingColumns = (
  getEmails: MeetingColumnsProps["getEmails"]
): ColumnDef<MeetingColumns>[] => [
  {
    id: "1",
    accessorKey: "title",
    header: () => {
      return <div className="flex gap-2 items-center">Title</div>
    },
  },
  {
    id: "2",
    accessorKey: "created_at",
    header: () => {
      return <div className="flex gap-2 items-center">Created At</div>
    },
    cell: ({ row }) => <div>{timeAgo(row?.original?.created_at)}</div>,
  },
  {
    id: "3",
    accessorKey: "Archive",
    cell: ({ row }) => {
      return (
        <ArchiveToggle
          id={row?.original?.id}
          getEmails={getEmails}
          value={row?.original?.archive}
        />
      )
    },
  },
  {
    id: "4",
    accessorKey: "Actions",
    cell: ({ row }) => {
      return (
        <>
          <JoinMeetingModal id={row?.original?.id} />
        </>
      )
    },
  },
  {
    id: "5",
    accessorKey: "Share",
    cell: ({ row }) => {
      return (
        <>
          <ShareMeetingModal id={row?.original?.id} />
        </>
      )
    },
  },
  {
    id: "6",
    accessorKey: "Google Calendar",
    cell: ({ row }) => {
      return (
        <div>
          <CalendarDrawer id={row?.original?.id} />
        </div>
      )
    },
  },
]
