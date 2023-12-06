"use clinet"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal, MoveDown, MoveUp } from "lucide-react"

export type RoboFundsColumn = {
  id: number
  name: string
  image: any
  change: string
  creator: string
  strategy: string
  monthlyFee: number
}

export const RoboFundsColumns: ColumnDef<RoboFundsColumn>[] = [
  {
    id: "1",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center  dark:text-brand-gray-30">
          #
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
  },
  {
    id: "2",
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="dark:text-brand-gray-30">Name</div>
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 py-3">
        <Image src={row?.original?.image} alt="" width={24} height={24} />
        <Link
          href="/market/robo-analyzer"
          className="black-600 text-base dark:text-white"
        >
          {row?.original?.name}
        </Link>
      </div>
    ),
  },
  {
    id: "3",
    accessorKey: "change",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center dark:text-brand-gray-30">
          Change
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div
        className={`flex gap-2 items-center ${
          row?.original?.change.startsWith("+")
            ? "text-brand-green-70"
            : "text-brand-red-80"
        }`}
      >
        {row?.original?.change.startsWith("+") ? (
          <MoveUp fill="brand-green-70" size={12} />
        ) : (
          <MoveDown fill="brand-green-70" size={12} />
        )}
        <div>{row?.original?.change}%</div>
      </div>
    ),
  },
  {
    id: "4",
    accessorKey: "creator",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center  dark:text-brand-gray-30">
          Creator
        </div>
      )
    },
  },
  {
    id: "5",
    accessorKey: "strategy",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center  dark:text-brand-gray-30">
          Strategy
        </div>
      )
    },
  },
  {
    id: "6",
    accessorKey: "monthlyFee",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center  dark:text-brand-gray-30">
          Monthly Fee
        </div>
      )
    },
  },
  {
    id: "7",
    accessorKey: "",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-2 item-center">
        <Link
          href="/market/robo-funds/subscription"
          className="bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-green-70 font-medium"
        >
          Subscribe
        </Link>
        <div className="bg-brand-gray-10 px-3.5 py-2 rounded-lg cursor-pointer">
          <MoreHorizontal className="inline stroke-brand-gray-60" size={16} />
        </div>
      </div>
    ),
  },
]
