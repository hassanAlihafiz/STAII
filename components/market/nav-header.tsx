"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Filter } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"

const MarketPages = [
  {
    name: "assets",
    href: "/market/assets",
  },
  {
    name: "watchlist",
    href: "/market/watchlist",
  },
  {
    name: "RoboFunds",
    href: "/market/robo-funds",
  },
  {
    name: "News",
    href: "/market/news",
  },
]

// const options = ["1h", "24h", "7D", "30D"]
const options = [
  { id: 1, label: "1h ", value: "1h" },
  { id: 2, label: "24h", value: "24h" },
  { id: 3, label: "7D", value: "7D" },
  { id: 4, label: "30D", value: "30D" },
]
const rowOptions = [
  { id: 1, label: "10", value: "10" },
  { id: 2, label: "20", value: "20" },
  { id: 3, label: "30", value: "30" },
  { id: 4, label: "40", value: "40" },
]
const filterLocations = [
  { value: "buenos-aires", label: "Buenos Aires" },
  { value: "sydney", label: "Sydney" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "london", label: "London" },
  { value: "tokyo", label: "tokyo" },
]

Object.freeze(MarketPages)
const MarketNavHeader = () => {
  const pathname = usePathname()
  const [flSelected, setFlSelected] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const handleFilterSelectAll = (value: boolean) => {
    setSelectAll(value)
    if (value) {
      const extractedValues: string[] = filterLocations.map(
        (location) => location.value
      )
      setFlSelected(extractedValues)
    } else {
      setFlSelected([])
    }
  }

  const handleCheckboxChange = (value: string) => {
    const updatedSelected = [...flSelected]
    if (updatedSelected.includes(value)) {
      updatedSelected.splice(updatedSelected.indexOf(value), 1)
    } else {
      updatedSelected.push(value)
    }
    setFlSelected(updatedSelected)
    setSelectAll(updatedSelected.length === filterLocations.length)
  }
  return (
    <div className="max-md:px-4">
      <h1 className="page-h1">Markets</h1>
      <div className="flex justify-between items-center w-full border-b border-b-brand-gray-20 dark:border-b-brand-blue-90">
        <ul className="flex items-center w-full max-w-[1280px]">
          {MarketPages.map((link, i) => (
            <li
              className={`relative mr-6 grid h-full place-items-center `}
              key={i}
            >
              <Link
                href={link.href}
                className={`font-medium py-5 capitalize text-[#2A3033] dark:text-white ${
                  pathname !== link.href && "text-[#6A7381] dark:text-[#D7DBE0]"
                }`}
              >
                {link.name}
              </Link>

              <span
                className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2  bg-primary-foreground  transition-all duration-300 "
                style={
                  pathname === link.href ? { width: "100%" } : { width: "0" }
                }
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 max-md:hidden">
          <Select defaultValue="1h">
            <SelectTrigger className="w-36 h-11 !rounded-xl cursor-pointer flex relative">
              <div className="absolute -top-0.5">
                <label className=" text-brand-gray-50 dark:text-brand-gray-50 !text-[10px] font-semibold ">
                  Price Change
                </label>
              </div>
              <div className="mt-3.5">
                <SelectValue className="!text-xs" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue="10">
            <SelectTrigger className="w-36 h-11 !rounded-xl cursor-pointer flex relative">
              <div className="absolute -top-0.5">
                <label className="text-brand-gray-50 dark:text-brand-gray-50 !text-[10px] font-semibold ">
                  Show Rows
                </label>
              </div>
              <div className="mt-3.5">
                <SelectValue className="!text-xs" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {rowOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-11 w-12 rounded-lg bg-brand-gray-10 dark:bg-brand-blue-90 hover:bg-brand-gray-10">
                <Filter
                  className="stroke-brand-gray-90 dark:stroke-brand-gray-40"
                  strokeWidth={2}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="rounded-lg p-4 dark:bg-brand-gray-100">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <div className="min-h-[25px] flex items-center">
                    <Checkbox
                      id="all"
                      checked={selectAll}
                      onCheckedChange={(e: any) => handleFilterSelectAll(e)}
                      // className="!text-brand-gray-900 dark:!text-white after:bg-brand-green-70 dark:before:bg-brand-blue-90"
                    />
                  </div>
                  All
                </div>
                <div className="flex gap-2 flex-col">
                  {filterLocations?.map((location) => {
                    return (
                      <div className="flex gap-3">
                        <div className="min-h-[25px] flex items-center">
                          {" "}
                          <Checkbox
                            id={location?.value}
                            value={location?.value}
                            checked={flSelected?.includes(location.value)}
                            onCheckedChange={(e: any) =>
                              handleCheckboxChange(location.value)
                            }
                            className="after:bg-brand-green-70 dark:before:bg-brand-blue-90"
                          />
                        </div>
                        <div className="!text-brand-gray-900 dark:!text-white">
                          {location?.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default MarketNavHeader
