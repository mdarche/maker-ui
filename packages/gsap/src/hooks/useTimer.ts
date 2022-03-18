import { useEffect, useState } from 'react'

export const useTimer = (
  delay: number,
  maxRuns: number,
  callback: () => void,
  params: any[] = []
) => {
  const [isActive, setIsActive] = useState(true)
  const [effectCount, setEffectCount] = useState(0)

  function pause() {
    setIsActive(false)
  }

  function resume() {
    setIsActive(true)
  }

  function restart() {
    setEffectCount(0)
    setIsActive(true)
  }

  useEffect(() => {
    let timer: null | ReturnType<typeof setTimeout> = null
    if (isActive && effectCount < maxRuns) {
      timer = setTimeout(() => {
        callback.apply(params)
        setEffectCount((s) => s + 1)
      }, delay * 1000)
    }
    return () => (timer ? clearInterval(timer) : undefined)
  }, [delay, callback, params, maxRuns, isActive, effectCount])

  return { pause, resume, restart }
}
