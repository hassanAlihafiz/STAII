"use client"

import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight } from "lucide-react"

import AssetNameComp from "@/components/market/assset-name"

export type AssetColumn = {
  id: number
  assetName: string
  assetImage: any
  assetCompany?: string
  sentiment: number
  change: number
  changeValue: number
  line: any
  sell: number
  buy: number
}

export const assetMobileColumns: ColumnDef<any>[] = [
  {
    id: "1",
    accessorKey: "assetName",
    header: () => {
      return (
        <div className="w-max  flex gap-2 items-center text-sm">
          <div>Asset & change</div>
          <div>
            <ChevronDown size={10} className="cursor-pointer" />
          </div>
        </div>
      )
    },
    cell: ({ row }) => <AssetNameComp data={row?.original} />,
  },
  {
    id: "2",
    accessorKey: "line",
    header: () => {
      return (
        <div className="flex gap-2 items-center justify-end">
          price
          <ChevronDown size={10} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="border broder-brand-gray-20 dark:border-transparent dark:bg-brand-blue-90 flex flex-col w-20 h-11 items-center justify-center rounded-lg px-5">
          <div className="text-brand-gray-60 dark:text-brand-gray-40">sell</div>
          <div className="black-500 text-sm dark:text-white">
            $
            {row?.original?.details?.price?.P === 0
              ? Number(
                  row?.original?.details?.universalSnapshot[0]?.last_quote?.bid
                ).toFixed(2)
              : row?.original?.details?.price?.P}
          </div>
        </div>
        <div className="border broder-brand-gray-20 dark:border-transparent dark:bg-brand-blue-90 flex flex-col w-20 h-11 items-center justify-center rounded-lg px-5">
          <div className="text-brand-gray-60 dark:text-brand-gray-40">Buy</div>
          <div className="black-500 text-sm dark:text-white">
            $
            {row?.original?.details?.price?.p === 0
              ? Number(
                  row?.original?.details?.universalSnapshot[0]?.last_quote?.ask
                ).toFixed(2)
              : row?.original?.details?.price?.p}
          </div>
        </div>
      </div>
    ),
  },

  // {
  //   id: "3",
  //   accessorKey: "",
  //   header: "",
  //   cell: () => (
  //     <Link href="/script/aapl">
  //       <ChevronRight size={18} className="cursor-pointer" />
  //     </Link>
  //   ),
  // },
]
