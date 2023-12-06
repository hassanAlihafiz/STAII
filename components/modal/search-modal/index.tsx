"use client"

import { useState } from "react"
import Image from "next/image"
import { searchItems } from "@/utils/notification"
import { DialogClose } from "@radix-ui/react-dialog"
import { Search, X, XCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function SearchModal() {
  const [searchText, setSearchText] = useState("")
  const [recentSearches, setRecentSearches] = useState(searchItems)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search
          className="mx-2 cursor-pointer text-primary-foreground"
          strokeWidth="1px"
        />
      </DialogTrigger>
      <DialogContent className="block p-5 border dark:border-[#202A41] dark:bg-[#202A41] sm:min-h-[500px] sm:w-[500px] sm:max-w-[500px] max-md:!h-full max-md:rounded-none">
        <DialogHeader className="md:hidden flex-row h-fit gap-3">
          <div className="relative !h-9 w-full flex items-center">
            <Input
              placeholder="Search"
              className="!h-9 pl-10 bg-[#7676801F] border-none text-base"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute left-3 h-5 w-5 text-[#9CA5AF]" />
            {searchText.length > 0 && (
              <XCircle
                className="absolute right-3 h-4 w-4 cursor-pointer text-[#9CA5AF]"
                onClick={() => setSearchText("")}
              />
            )}
          </div>

          <DialogClose className="!h-9  !mt-0 outline-none text-brand-green-70 text-sm font-semibold">
            Cancel
          </DialogClose>
        </DialogHeader>
        <DialogHeader className="hidden md:flex">
          <DialogTitle className="relative w-full pb-4 text-center dark:text-white">
            Search
            <DialogClose className="absolute -top-3 right-0 mr-2 mt-2 outline-none">
              <X className="ml-auto w-4 cursor-pointer text-[#9CA5AF]" />
            </DialogClose>
          </DialogTitle>
          <div className="relative  !h-10   w-full">
            <Search className="absolute left-3 top-[9px] h-5 w-5 text-[#9CA5AF]" />

            <Input
              className="!h-10 pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText.length > 0 && (
              <X
                className="absolute right-3 top-[13px] h-3 w-3 cursor-pointer text-[#9CA5AF]"
                onClick={() => setSearchText("")}
              />
            )}
          </div>
        </DialogHeader>
        <DialogDescription className="w-full">
          <div className="mt-6 flex w-full justify-between text-xl font-semibold dark:text-white text-brand-gray-100">
            Recent Searches
            {recentSearches?.length > 0 && (
              <span
                onClick={() => setRecentSearches([])}
                className="cursor-pointer text-brand-green-70 text-sm font-semibold"
              >
                Clear
              </span>
            )}
          </div>
          <div className="w-full">
            {recentSearches?.map((item, i) => (
              <div
                key={i}
                className={` flex h-17 -ml-5 -mr-5 px-5 py-4 cursor-pointer items-center justify-start  transition-all border-b border-[#E4E4E7] dark:border-[#2D374E]`}
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                  <Image src={item.image} alt="" fill />
                </div>

                <h6 className="ml-4 text-sm font-semibold text-[#2A3033] transition-colors duration-100  dark:text-white">
                  {item.title}
                </h6>
                <p className="ml-1 text-xs font-medium text-[#2B2D42] transition-colors duration-100  dark:text-white">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
