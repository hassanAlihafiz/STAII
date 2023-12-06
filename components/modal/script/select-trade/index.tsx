"use client"

import React from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import "@/styles/common-page.css"
import Link from "next/link"
import { useParams } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

const SelectTradeModal = () => {
  const params = useParams()
  const [isOpen, setIsOpen] = React.useState(false)
  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50"
          onClick={togglePopover}
        ></div>
      )}
      <Popover
        key="blur"
        onOpenChange={(open) => setIsOpen(open)}
        open={isOpen}
      >
        <PopoverTrigger>
          <Button className="rounded-lg w-[160px]">Trade</Button>
        </PopoverTrigger>
        <PopoverContent className="w-full h-full border-0 bg-transparent shadow-none -translate-y-[72px] max-md:translate-y-[72px]">
          <div className=" border-0 w-full flex flex-col justify-center items-center gap-2 max-md:flex-col-reverse max-md:justify-start ">
            <Button
              variant="ghost"
              className="rounded-lg w-[160px]"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <X className="text-brand-green-70" />
            </Button>
            <Link href={`/script/${params?.name}/sell`}>
              <Button className="rounded-xl w-[160px]">Sell</Button>
            </Link>
            <Link href={`/script/${params?.name}/buy`}>
              <Button className="rounded-xl w-[160px]">Buy</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SelectTradeModal
