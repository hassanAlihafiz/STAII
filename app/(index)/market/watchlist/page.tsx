"use client"

import React, { memo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { assetMobileColumns } from "@/utils/asset-mobile-column"
import { AreaChartData, AssetsData } from "@/utils/market"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, Trash } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import Pagination from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StackTable } from "@/components/ui/stack-table"
import { TableAreaChart } from "@/components/ui/table-area-chart"
import TableRangeLine from "@/components/ui/table-range-line"
import AssetMobileView from "@/components/market/asset-mobile-view"

const MemoizedLineChart = memo(TableRangeLine)

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

const MarketWatchList = () => {
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const [checked, setChecked] = useState<number[]>([])
  const options = [
    { id: 1, label: "12h ", value: "12h" },
    { id: 2, label: "24h", value: "24h" },
  ]

  const handleCheckboxChange = (itemId: number) => {
    const updatedChecked = [...checked]
    if (updatedChecked.includes(itemId)) {
      const index = updatedChecked.indexOf(itemId)
      updatedChecked.splice(index, 1)
    } else {
      updatedChecked.push(itemId)
    }
    setChecked(updatedChecked)
  }
  const handleSelectAll = (value: boolean) => {
    if (value) {
      const extractedIds = AssetsData.map((asset) => asset.id)
      setChecked(extractedIds)
    } else {
      setChecked([])
    }
  }

  const columns: ColumnDef<AssetColumn>[] = [
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2 py-3">
          <Checkbox
            id="assets"
            checked={checked?.includes(row?.original?.id)}
            onCheckedChange={() => handleCheckboxChange(row?.original?.id)}
          />
          <Image
            src={row?.original?.assetImage}
            alt=""
            width={24}
            height={24}
          />
          <Link
            href="/script/aapl"
            className="black-600 text-base dark:text-white hover:underline"
          >
            {row?.original?.assetName}
          </Link>
        </div>
      ),
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
      cell: ({ row }) => (
        <div className="mb-4 h-4 w-40">
          <TableRangeLine values={row?.original?.line} />
        </div>
      ),
    },
    {
      id: "3",
      accessorKey: "sentiment",
      header: () => {
        return (
          <div className="flex gap-2 items-center ">
            Sentiment
            <ChevronDown size={12} className="cursor-pointer" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center ">
          <div className="rounded-full w-2 h-2 bg-brand-green-70"></div>
          <div className="black-600 dark:text-white">
            {row?.original?.sentiment}%
          </div>
          <span className="text-brand-gray-60 dark:text-brand-gray-40">
            buying
          </span>
        </div>
      ),
    },
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
            {row?.original?.change}%
          </div>
          <span
            className={`${
              row?.original?.changeValue > 0
                ? "text-brand-green-70"
                : "text-brand-red-70"
            } text-xs font-semibold`}
          >
            {row?.original.changeValue}%
          </span>
        </div>
      ),
    },
    {
      id: "5",
      accessorKey: "chart",
      header: () => {
        return (
          <div className="flex cursor-pointer w-40">
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
      cell: () => (
        <div className="h-16 w-40">
          <TableAreaChart data={AreaChartData} />
        </div>
      ),
    },
    {
      id: "6",
      accessorKey: "sell",
      header: () => {
        return (
          <div className="flex gap-2 items-center">
            Sell
            <ChevronDown size={12} className="cursor-pointer" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="black-500 text-sm dark:text-white">
          {row?.original?.sell}
        </div>
      ),
    },
    {
      id: "7",
      accessorKey: "buy",
      header: () => {
        return (
          <div className="flex gap-2 items-center ">
            Buy
            <ChevronDown size={12} className="cursor-pointer" />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="black-500 text-sm dark:text-white">
          {row?.original?.buy}
        </div>
      ),
    },
    {
      id: "8",
      accessorKey: "",
      header: "",
      cell: () => (
        <div className="flex gap-2 item-center">
          <button className="bg-brand-gray-10 px-3.5 py-2 rounded-lg text-brand-red-80 font-medium">
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
        <Trash size={14} strokeWidth={1} className="cursor-pointer" />
      ),
    },
  ]

  return (
    <>
      <div className="w-full mt-1 overflow-auto max-md:px-3">
        <div className="max-md:hidden">
          <StackTable
            columns={columns}
            data={dataPerPage}
            checked={checked}
            onCheckedChange={handleSelectAll}
          />
        </div>
        <div className="md:hidden max-md:block">
          <AssetMobileView columns={assetMobileColumns} data={dataPerPage} />
        </div>
      </div>
      <Pagination
        data={AssetsData}
        totalData={AssetsData?.length}
        setDataPerPage={setDataPerPage}
      />
    </>
  )
}

export default MarketWatchList
