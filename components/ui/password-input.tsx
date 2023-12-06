"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { FieldError, UseFormRegister } from "react-hook-form"

interface Props {
  register: UseFormRegister<any>
  error: FieldError | undefined
  name?: string
  inputLabel?: string
  placeholder?: string
}

const PasswordInput = ({
  register,
  error,
  name,
  inputLabel,
  placeholder,
}: Props) => {
  const [show, setShow] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const handleInputFocus = () => {
    setIsFocused(true)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
  }
  return (
    <div className="flex w-full flex-col items-start mb-2">
      <div
        className={`relative !mb-0 h-fit w-full  ${
          isFocused ? "placeholder-shifted" : ""
        }`}
      >
        {inputLabel && (
          <label
            className={`z-[1] text-brand-gray-50 text-[12px] font-[600] absolute top-[6px] left-[20px] pb-[10px] ${
              isFocused ? "label-shifted" : ""
            }`}
          >
            {inputLabel}
          </label>
        )}
        <input
          {...register(name || "password", { required: true })}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="dark:border-brand-gray-70 w-full dark:bg-brand-blue-90 input form-input relative !mb-1 outline-none md:h-14"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <span className="absolute right-0 top-[65%] z-[1] grid w-7 -translate-y-full place-items-center ">
          {show ? (
            <Eye
              onClick={() => setShow(!show)}
              className="cursor-pointer text-brand-gray-50 right-[15px] relative"
              size={20}
            />
          ) : (
            <EyeOff
              onClick={() => setShow(!show)}
              className="cursor-pointer text-brand-gray-50 right-[15px] relative"
              size={20}
            />
          )}
        </span>
      </div>
      {error && <span className="input-error text-[red]">{error.message}</span>}
    </div>
  )
}

export default PasswordInput
