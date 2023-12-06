import React, { useEffect, useState } from "react"

interface Props {
  start: boolean
  initialValue?: number
  interval?: number
  value?: number
  onEnd?: () => void
}
const CountDownTimer = ({
  start,
  initialValue = 60,

  interval,
  value,
  onEnd,
}: Props) => {
  const [timer, setTimer] = useState(initialValue)
  const intervalValue = value || 1

  useEffect(() => {
    let timeInterval: NodeJS.Timeout

    if (start) {
      if (timer <= 0) return onEnd && onEnd()
      timeInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - intervalValue)
      }, interval || 1000)
    }

    return () => clearInterval(timeInterval)
  }, [start, timer])

  return <>{timer}</>
}

export default CountDownTimer
