"use client"

import React, { useLayoutEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Helmet } from "react-helmet"

const SetThemeColor = () => {
  const { resolvedTheme } = useTheme()
  const [themeColor, setThemeColor] = useState("")

  useLayoutEffect(() => {
    const newThemeColor =
      resolvedTheme === "dark" ? "rgba(16, 21, 32, 1)" : "#ffffff"

    setThemeColor(newThemeColor)
  }, [resolvedTheme])

  return (
    <Helmet>
      <meta name="theme-color" content={themeColor} />
    </Helmet>
  )
}

export default SetThemeColor
