"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { MoveLeft } from "lucide-react"

const BackBtn = () => {
  const router = useRouter()
  return (
    <div onClick={() => router.back()} className="flex items-center text-primary-foreground  transition-all cursor-pointer duration-300 ease-in-out hover:-ml-2 ">
      <MoveLeft className="lg:mr-2 w-3 text-[#6A7381] dark:text-brand-green-70 lg:text-primary-foreground lg:w-6" />
      <span className="hidden lg:inline-block text-base font-semibold text-primary-foreground dark:text-brand-green-70 ">
        Back
      </span>
    </div>
  )
}

export default BackBtn
