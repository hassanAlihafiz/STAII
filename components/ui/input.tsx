"use client"

import React, { useEffect, useRef, useState } from "react"
import { formatNumberInputs } from "@/utils/format-input"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  formated?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, value, placeholder, formated = false, name, ...props },
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

    return (
      <div className="relative w-full">
        <div>
          <input
            type={type}
            value={value}
            name={name}
            className={cn(
              `input flex ${
                isLabelFloating || value ? "text-[12px]" : "text-base"
              }  rounded-[8px] border border-input bg-transparent text-[#2A3033] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // onChange={(e) => {
            //   if (formated) formatNumberInputs(e)
            // }}
          />
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
