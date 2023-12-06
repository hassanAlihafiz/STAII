"use client"

import React from "react"
import { RefreshCcw, WifiOff } from "lucide-react"
import { Offline } from "react-detect-offline"

import { Button } from "../ui/button"

const OfflineAlert = () => {
  return (
    <>
      <Offline>
        <div className="flex w-full items-center justify-center bg-[#FEF2F2] p-2">
          <div className=" mr-3 grid h-7 w-7 place-items-center rounded-md bg-[#FEE2E2]">
            <WifiOff className="h-5 w-5 text-destructive" />
          </div>
          <p className="text-sm text-destructive">Seems that you offline</p>
          <Button
            className="w-30 ml-3 h-8 rounded-xl"
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              window.location.reload()
            }}
          >
            <RefreshCcw className="mr-1 h-4 w-4 text-inherit" /> Retry
          </Button>
        </div>
      </Offline>
    </>
  )
}

export default OfflineAlert
