"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const SimpleButton = () => {
  const router = useRouter()
  return (
    <button
      className=" absolute left-3 top-20 flex flex-row items-center rounded-3xl border border-[#D7DBE0] px-3 py-2 text-[#4B5563] transition-all hover:left-2 dark:border-white dark:text-white md:left-0 hover:md:-left-1 xl:top-28"
      onClick={() => router.back()}
    >
      <Image
        src="/icons/arrow-left.svg"
        alt="icon"
        width={20}
        height={20}
        className="mr-2 dark:hidden"
      />
      <Image
        src="/icons/arrow-left-dark.svg"
        alt="icon"
        width={20}
        height={20}
        className="mr-2 hidden dark:block"
      />
      Back to Home
    </button>
  )
}

export default SimpleButton
