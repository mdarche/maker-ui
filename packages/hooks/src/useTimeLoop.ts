import { useEffect, useState } from 'react'

interface TimerSettings {
  duration: number
  maxRuns: number
  callback: () => void
  params?: any[]
  pauseOnBlur?: boolean
}

/**
 * The `useTimeLoop` hook lets you create a timer that can be paused, resumed, and restarted.
 * This is useful for components like an auto-paginating carousel.
 *
 * @param duration{number} - The duration in seconds between each run of the callback
 * @param maxRuns{number} - The maximum number of times the callback will be run
 * @param callback{() => void} - The callback function to be invoked when the timer completes a run
 * @param params{any[]} - An array of parameters to be passed to the callback function for
 * dynamic functionality
 *
 * @returns A Timer object containing the pause, resume, restart, and runs functions
 */

export const useTimeLoop = ({
  duration,
  maxRuns = -1, // Infinite
  callback,
  params = [],
  pauseOnBlur = true,
}: TimerSettings) => {
  const [isActive, setIsActive] = useState(true)
  const [effectCount, setEffectCount] = useState(0)

  useEffect(() => {
    let timer: null | ReturnType<typeof setTimeout> = null
    if ((isActive && effectCount < maxRuns) || maxRuns === -1) {
      timer = setTimeout(() => {
        callback?.apply(params)
        setEffectCount((s) => s + 1)
      }, duration * 1000)
    }
    return () => (timer ? clearInterval(timer) : undefined)
  }, [duration, callback, params, maxRuns, isActive, effectCount])

  useEffect(() => {
    if (!pauseOnBlur) return
    window.addEventListener('blur', pause)
    window.addEventListener('focus', resume)

    return () => {
      window.removeEventListener('blur', pause)
      window.removeEventListener('focus', resume)
    }
  })

  function pause() {
    if (isActive) {
      setIsActive(false)
    }
  }

  function resume() {
    if (!isActive) {
      setIsActive(true)
    }
  }

  function restart() {
    setEffectCount(0)
    setIsActive(true)
  }

  return { pause, resume, restart, runs: effectCount }
}
