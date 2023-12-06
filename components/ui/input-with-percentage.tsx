"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string | undefined
  sign?: any
}

const InputWithPercentage = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, inputLabel, value, placeholder, name, ...props },
    ref
  ) => {
    const filterValue = props.sign
      ? `${
          value
            ?.toString()
            .match(/([1-9][0-9]*|[0-9]*)/g)
            ?.join("") || ""
        }${props.sign}`
      : value

    return (
      <div>
        {inputLabel && (
          <div className="w-full text-center text-brand-gray-60 font-medium">
            <label>{inputLabel}</label>
          </div>
        )}
        <div className="relative flex items-center">
          <div className="absolute left-0 flex justify-center items-center rounded-[50%] h-[32px] w-[32px] cursor-pointer bg-[#F4F5FA] dark:bg-brand-blue-90 hover:bg-white hover:shadow-day text-xs font-semibold uppercase  transition duration-200  hover:dark:bg-brand-gray-70 dark:text-brand-gray-50 hover:dark:!text-white px-1 py-2">
            <TrendingUp size={20} strokeWidth={1} />
          </div>
          <input
            type={type}
            value={props?.sign ? filterValue : value}
            name={name}
            className={cn(
              `input flex  ${
                inputLabel && type === "number"
                  ? "p-[0px_0px_0px_30px]"
                  : inputLabel && "p-[0px_0px_0px_32px]"
              } "text-base"
               w-36 rounded-[8px] bg-transparent text-[#2A3033] focus:!shadow-none focus:!border-0`,
              className
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
InputWithPercentage.displayName = "InputWithPercentage"

export { InputWithPercentage }
