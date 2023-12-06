"use client"

import React, { ButtonHTMLAttributes, useEffect, useState } from "react"
import { VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "./button"

type AsyncButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    text?: string
    endlessLoader?: boolean
  }

const AsyncButton = ({
  children,
  loading,
  text,
  endlessLoader,
  ...restProps
}: AsyncButtonProps) => {
  const [buttonLoading, setButtonLoading] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    if (endlessLoader && buttonLoading) {
      timeoutId = setTimeout(() => {
        setButtonLoading(false)
      }, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [buttonLoading])

  if (loading || buttonLoading) {
    return (
      <Button disabled={loading} {...restProps}>
        <div
          className="spin-loader h-5 w-5 text-gray-400 dark:text-white"
          role="status"
        />
      </Button>
    )
  }

  return (
    <Button
      onClick={() => {
        if (endlessLoader) {
          setButtonLoading(true)
        }
      }}
      disabled={loading}
      type="submit"
      {...restProps}
    >
      {children ? children : text || "Continue"}
    </Button>
  )
}

export default AsyncButton
