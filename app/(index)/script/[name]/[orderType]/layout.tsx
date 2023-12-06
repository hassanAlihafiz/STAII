"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"

const BuySellPagesLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const router = useRouter()

  if (params?.orderType !== "buy" && params?.orderType !== "sell") {
    router.back()
    return null
  }
  return <>{children}</>
}

export default BuySellPagesLayout
