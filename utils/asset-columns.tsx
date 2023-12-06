"use client"

import Image from "next/image"
import Link from "next/link"
import { AreaChartData } from "@/utils/market"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal, Star } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TableAreaChart } from "@/components/ui/table-area-chart"
import TableRangeLine from "@/components/ui/table-range-line"
import AssetNameComp from "@/components/market/assset-name"

const options = [
  { id: 1, label: "12h ", value: "12h" },
  { id: 2, label: "24h", value: "24h" },
]

export type AssetColumn = {
  id: number
  symbol: string
  assetImage: any
  assetCompany?: string
  sentiment: number
  change: number
  changeValue: number
  line: any
  sell: number
  buy: number
}

export const assetColumns: ColumnDef<any>[] = [
  {
    id: "1",
    accessorKey: "assetName",
    header: () => {
      return (
        <div className="flex gap-2 items-center">
          Assets
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => {
      return <AssetNameComp data={row?.original} />
    },
  },
  {
    id: "2",
    accessorKey: "line",
    header: () => {
      return (
        <div className="flex gap-2 items-center">
          52W Range
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => {
      const values = {
        ranges: [
          row?.original?.range?.fiftyTwoWeekLow,
          row?.original?.range?.fiftyTwoWeekHigh,
        ],
        measures: [
          row?.original?.range?.fiftyTwoWeekLow,
          row?.original?.range?.fiftyTwoWeekHigh,
        ],
        target: row?.original?.details?.change?.fmv,
      }
      return (
        <div className="mb-4 h-4 w-40">
          <TableRangeLine values={values} />
        </div>
      )
    },
  },
  // {
  //   id: "3",
  //   accessorKey: "sentiment",
  //   header: () => {
  //     return (
  //       <div className="flex gap-2 items-center ">
  //         Sentiment
  //         <ChevronDown size={12} className="cursor-pointer" />
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="flex gap-2 items-center ">
  //       <div className="rounded-full w-2 h-2 bg-brand-green-70"></div>
  //       <div className="black-600 dark:text-white">
  //         {row?.original?.sentiment}%
  //       </div>
  //       <span className="text-brand-gray-60 dark:text-brand-gray-40">
  //         buying
  //       </span>
  //     </div>
  //   ),
  // },
  {
    id: "4",
    accessorKey: "change",
    header: () => {
      return (
        <div className="flex gap-2 items-center ">
          Change
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div className="black-600 dark:text-white">
          {row?.original?.details?.change?.todaysChange === undefined
            ? "0.00"
            : row?.original?.details?.change?.todaysChange > 0
            ? `+${row?.original?.details?.change?.todaysChange}`
            : `${row?.original?.details?.change?.todaysChange}`}
          {/* % */}
        </div>
        <span
          className={`${
            row?.original?.details?.change?.todaysChange > 0
              ? "text-brand-green-70"
              : "text-brand-red-70"
          } text-xs font-semibold`}
        >
          {row?.original?.details?.change?.todaysChange === undefined
            ? "0.00"
            : row?.original.details?.change?.todaysChangePerc}
          %
        </span>
      </div>
    ),
  },
  {
    id: "5",
    accessorKey: "chart",
    header: () => {
      return (
        <div className="flex cursor-pointer w-20">
          <Select>
            <SelectTrigger className="h-8 !rounded-xl cursor-pointer">
              <SelectValue placeholder="12h" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="h-16 w-40">
        <TableAreaChart
          data={
            row?.original?.details?.cData.length > 0
              ? row?.original?.details?.cData
              : []
          }
        />
      </div>
    ),
  },
  {
    id: "6",
    accessorKey: "sell",
    header: () => {
      return (
        <div className="flex gap-2 items-center">
          Bid
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="black-500 text-sm dark:text-white">
          $
          {row?.original?.details?.price?.P === 0
            ? Number(
                row?.original?.details?.universalSnapshot[0]?.last_quote?.bid
              ).toFixed(2)
            : Number(row?.original?.details?.price?.P).toFixed(2)}
        </div>
      )
    },
  },
  {
    id: "7",
    accessorKey: "buy",
    header: () => {
      return (
        <div className="flex gap-2 items-center ">
          Ask
          <ChevronDown size={12} className="cursor-pointer" />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="black-500 text-sm dark:text-white">
        $
        {row?.original?.details?.price?.p === 0
          ? Number(
              row?.original?.details?.universalSnapshot[0]?.last_quote?.ask
            ).toFixed(2)
          : Number(row?.original?.details?.price?.p).toFixed(2)}
      </div>
    ),
  },
  {
    id: "7",
    accessorKey: "sell",
    header: () => {
      return <div className="flex gap-2 items-center">FMV</div>
    },
    cell: ({ row }) => (
      <div className="black-500 text-sm dark:text-white">
        ${row?.original?.details?.change?.fmv?.toFixed(2)}
      </div>
    ),
  },
  {
    id: "8",
    accessorKey: "",
    header: "",
    cell: () => (
      <div className="flex gap-2 item-center">
        <button className="bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-red-80 font-medium ">
          Sell
        </button>
        <button className="bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-green-70 font-medium">
          Buy
        </button>
      </div>
    ),
  },
  {
    id: "9",
    accessorKey: "",
    header: "",
    cell: () => (
      <MoreHorizontal
        className="inline fill-brand-gray-60 cursor-pointer"
        size={14}
      />
    ),
  },
]
