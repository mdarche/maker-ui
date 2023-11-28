import { useState, useEffect, useCallback, useRef } from 'react'

export interface Countdown {
  /** The number of days remaining */
  days: number
  /** The number of hours remaining */
  hours: number
  /** The number of minutes remaining */
  minutes: number
  /** The number of seconds remaining */
  seconds: number
  /** A boolean that indicates if the countdown has expired */
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
export const useCountdown = (endDate: Date, onCountdownEnd?: () => void) => {
  if (!endDate) {
    throw new Error('endDate parameter is required')
  }

  if (onCountdownEnd !== undefined && typeof onCountdownEnd !== 'function') {
    throw new Error('onCountdownEnd must be a function')
  }

  const intervalRef = useRef<number | null>(null)
  const [countdown, setCountdown] = useState<Countdown>(
    calculateCountdown(endDate)
  )

  const clearTimer = useCallback(() => {
    // Only clear if the timer is running
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (countdown.expired) return

    intervalRef.current = setInterval(() => {
      setCountdown(calculateCountdown(endDate))
    }, 1000) as unknown as number

    return () => clearTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimer])

  useEffect(() => {
    if (countdown.expired && intervalRef.current) {
      clearTimer()
      onCountdownEnd && onCountdownEnd()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown.expired])

  return countdown
}

const calculateCountdown = (endDate: Date) => {
  const timeLeft = endDate.getTime() - Date.now()

  if (timeLeft <= 0) {
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

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false,
  }
}
