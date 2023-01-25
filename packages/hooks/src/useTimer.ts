import { useEffect, useState } from 'react'

export const useTimer = (
  delay: number,
  maxRuns: number,
  callback: () => void,
  params: any[] = []
) => {
  const [isActive, setIsActive] = useState(true)
  const [effectCount, setEffectCount] = useState(0)

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

  useEffect(() => {
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

  return { pause, resume, restart }
}
