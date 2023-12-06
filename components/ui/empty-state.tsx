"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "./button"

interface EmptyStateProps {
  mainImage: string
  title: string
  detail: string
  btnTitle?: string
  BtnRoute?: string
}

function EmptyState({
  title,
  detail,
  btnTitle,
  BtnRoute,
  mainImage,
}: EmptyStateProps) {
  const router = useRouter()
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-fit flex flex-col items-center justify-center gap-2">
        <div>
          <Image src={mainImage} width={250} height={250} alt="mainImage" />
        </div>
        <div className="black-600 dark:text-white">{title}</div>
        <div className="text-brand-gray-60 dark:text-brand-gray-40 text-center text-sm sm:w-[340px] mb-6">
          {detail}
        </div>
        {btnTitle && (
          <div className="w-full">
            <Button
              onClick={() => router.push(`${BtnRoute}`)}
              className="w-full h-[43px] rounded-[10px] green-button"
            >
              {btnTitle}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState
