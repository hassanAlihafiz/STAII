"use client"

import React, { useState } from "react"
import Image from "next/image"
import { DialogClose } from "@radix-ui/react-dialog"
import * as Dialoge from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import language from "../../../config/language/language.json"

interface languageModalProps {
  lngState?: any
  setLngState?: any
}

const LanguageModal: React.FC<languageModalProps> = ({
  lngState,
  setLngState,
}) => {
  const [checked, setChecked] = useState(Number)

  const handleSubmit = () => {
    if (checked === 0 || checked) {
      const lang = language.filter((lang, index) => {
        return index === checked
      })[0]
      setLngState(lang.name)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end relative">
          <Image
            src="/icons/next.svg"
            alt="=Next icon"
            className="cursor-pointer absolute bottom-[21px] right-[17px]"
            width={27}
            height={27}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="pt-6 pb-3 right-[0px] !rounded-none h-[715px] overflow-auto sm:w-[450px] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="pl-6 text-[16px]"> Language</div>
            <DialogClose className="absolute -top-3 right-0 mr-5 mt-2 outline-none">
              <X className="ml-auto w-4 cursor-pointer text-[#9CA5AF]" />
            </DialogClose>
            <div className="bg-[#EDEEF3] h-[1px] w-full mt-[22px]"></div>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="text-[#2A3033] p-[2px_20px_0px_23px]">
              {language?.map((lang, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b-[2px] border-[#EDEEF3] rounded"
                    onClick={() => {
                      setChecked(index)
                    }}
                  >
                    <div className="py-[13px] ">
                      <p className="text-[#1A262D] text-[14px] font-[500]">
                        {lang?.name}
                      </p>
                    </div>
                    {checked === index && (
                      <div key={index}>
                        <Image
                          src="/icons/check-bold.svg"
                          alt="=Next icon"
                          className="w-[18px] cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="pt-[15px] pr-[20px] flex justify-end items-center">
                <Dialoge.Close asChild>
                  <Button variant="ghost" className="button-box mr-[20px]">
                    Cancel
                  </Button>
                </Dialoge.Close>
                <Dialoge.Close asChild>
                  <Button
                    onClick={() => {
                      handleSubmit()
                    }}
                    variant="default"
                    className="button-box "
                  >
                    Save
                  </Button>
                </Dialoge.Close>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LanguageModal
