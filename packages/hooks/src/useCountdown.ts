import { useState, useEffect, useRef } from 'react'

interface Countdown {
  /** The number of days remaining */
  days: number
  /** The number of hours remaining */
  hours: number
  /** The number of minutes remaining */
  minutes: number
  /** The number of seconds remaining */
  seconds: number
  /** Whether the countdown has expired */
  expired: boolean
}

/**
 * The useCountdown hook lets you create a countdown timer that can be used to display a timer
 * with days, hours, minutes, and seconds.
 *
 * @param endDate{Date} - The date that the countdown should end
 * @param onCountdownEnd{() => void} - A callback function that is invoked when the countdown ends
 *
 * @returns a Countdown object containing the days, hours, minutes, seconds, and expired properties
 */
export const useCountdown = (
  endDate: Date,
  onCountdownEnd: () => void
): Countdown => {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const calculateCountdown = (): Countdown => {
    const timeLeft = endDate.getTime() - Date.now()
    if (timeLeft <= 0) {
      onCountdownEnd()
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      }
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
    const seconds = Math.floor((timeLeft / 1000) % 60)
    return { days, hours, minutes, seconds, expired: false }
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(calculateCountdown())
    }, 1000)
    return () => clearInterval(intervalRef.current as NodeJS.Timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return countdown
}
