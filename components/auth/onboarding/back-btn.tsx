"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { MoveLeft } from "lucide-react"

const BackButton = () => {
  const router = useRouter()
  return (
    <div onClick={() => router.back()} className="form-back-btn ">
      <MoveLeft className="lg:mr-2 w-3 text-[#6A7381] dark:text-white lg:text-primary-foreground lg:w-6" />
      <span className="hidden lg:inline-block text-base font-semibold text-primary-foreground dark:text-white ">
        Back
      </span>
    </div>
  )
}

export default BackButton
