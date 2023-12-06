"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string | undefined
  sign?: any
  labelClass?: string
}

const InputInsideLabel = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputLabel,
      value,
      placeholder,
      name,
      labelClass,
      ...props
    },
    ref
  ) => {
    const [isLabelFloating, setIsLabelFloating] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      setIsLabelFloating(!!value || !!placeholder)
    }, [value, placeholder])

    const handleFocus = () => {
      setIsLabelFloating(true)
      inputRef.current?.focus()
    }

    const handleBlur = () => {
      if (!inputRef.current?.value && !placeholder) {
        setIsLabelFloating(false)
      }
    }
    const filterValue = props.sign
      ? `${props.sign}${
          value
            ?.toString()
            .match(/([1-9][0-9]*|[0-9]*)/g)
            ?.join("") || ""
        }`
      : value

    return (
      <div className="relative">
        {inputLabel && (
          <div className={`relative cursor-pointer`} onClick={handleFocus}>
            <label
              className={`${labelClass} max-md:w-full max-md:-top-2 max-md:text-center text-[#9CA5AF] text-[12px] font-[600] absolute  left-[20px] pb-[10px] transition-all ${
                isLabelFloating || value
                  ? "top-1 text-xs font-semibold text-brand-gray-50"
                  : "top-8 -translate-y-1/2 text-base font-normal text-brand-gray-50 z-10"
              }`}
            >
              {inputLabel}
            </label>
          </div>
        )}
        <div>
          <input
            type={type}
            value={props?.sign ? filterValue : value}
            name={name}
            className={cn(
              `input flex  ${
                inputLabel && type === "number"
                  ? "p-[14px_0px_0px_30px]"
                  : inputLabel && "p-[14px_0px_0px_20px]"
              } ${
                isLabelFloating || value ? "text-[12px]" : "text-base"
              }  rounded-[8px] border border-input bg-transparent text-[#2A3033] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    )
  }
)
InputInsideLabel.displayName = "InputInsideLabel"

export { InputInsideLabel }
