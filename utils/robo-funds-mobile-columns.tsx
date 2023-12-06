"use client"

import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight } from "lucide-react"

export type RoboFundsColumn = {
  id: number
  name: string
  image: any
  change: string
  creator: string
  strategy: string
  monthlyFee: number
}

export const RoboFundMobileViewColumns: ColumnDef<RoboFundsColumn>[] = [
  {
    id: "1",
    accessorKey: "id",
    header: () => {
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
    header: () => {
      return (
        <div className="w-max flex gap-2 items-center text-sm">
          <div>Name</div>
          <div>
            <ChevronDown size={10} className="cursor-pointer" />
          </div>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 w-max">
        <div className="flex items-center gap-2">
          <Image src={row?.original?.image} alt="" width={20} height={20} />
          <Link
            href="/market/robo-analyzer"
            className="black-600 text-sm dark:text-white hover:underline"
          >
            {" "}
            {row?.original?.name}
          </Link>
        </div>
        <div className="w-full flex ml-7">
          <div className="flex items-center">
            {row?.original?.change.startsWith("+") ? (
              <ArrowUp size={12} stroke="#069D6E" />
            ) : (
              <ArrowDown size={12} stroke="#D90429" />
            )}
          </div>
          <div
            className={`${
              row?.original?.change.startsWith("+")
                ? "text-brand-green-70"
                : "text-brand-red-80"
            } text-sm font-semibold flex justify-center `}
          >
            {row?.original.change}%
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    accessorKey: "creator",
    header: () => {
      return (
        <div className="flex gap-2 items-center  dark:text-brand-gray-30 ">
          Creator
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="w-max black-500 dark:text-brand-gray-30">
        {row?.original?.creator}
      </div>
    ),
  },

  {
    id: "4",
    accessorKey: "",
    header: "",
    cell: () => (
      <Link href="/market/robo-analyzer">
        {" "}
        <ChevronRight size={18} className="cursor-pointer" />
      </Link>
    ),
  },
]
