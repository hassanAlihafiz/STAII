"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const handleToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <div className=" flex items-center ">
      <button
        onClick={handleToggle}
        className={`relative ml-2 flex min-h-[25px] w-11  flex-row items-center rounded-full  border border-solid border-border bg-[#069D6E] p-1 transition-colors duration-200 ease-in-out focus:outline-none  `}
      >
        <span
          className={`absolute left-[2px] font-medium  z-10 inline-block aspect-square min-h-[18px] rounded-full bg-white shadow-lg transition-all duration-500  ease-in-out dark:left-[23px] dark:bg-[#fff]`}
          style={{ transitionDuration: "0.5s" }}
        />
      </button>
    </div>
  )
}
