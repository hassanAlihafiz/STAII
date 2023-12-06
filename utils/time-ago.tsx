import React, { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

function TimeAgo(dateTime: string) {
  let formatedDate = new Date(dateTime)
  return formatDistanceToNow(formatedDate, { addSuffix: true })
}

function timeAgo(utcTimestamp: string): string {
  const currentTimestamp = new Date()
  const timestamp = new Date(utcTimestamp)

  const timeDifference = currentTimestamp.getTime() - timestamp.getTime()
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`
  }
}
export default timeAgo
