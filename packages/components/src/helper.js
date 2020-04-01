import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}

export function useTracker(type, key, toggle, expiration) {
  const [active, set] = useState(true)
  const delay = () => {
    setTimeout(() => {
      set(false)
    }, 1000)
  }

  function handleSession() {
    const sessionCheck = sessionStorage.getItem(key)

    if (toggle && sessionCheck) {
      return set(false)
    }
    if (!toggle && !sessionCheck) {
      delay()
      return sessionStorage.setItem(key, 'true')
    }
  }

  function handleCookie() {
    const cookieCheck = document.getCookie(key)

    if (toggle && cookieCheck) {
      return set(false)
    }
    if (!toggle && !cookieCheck) {
      delay()
      return (document.cookie = `${key}=true;expires=${expiration};path=/`)
    }
  }

  useEffect(() => {
    if (type === 'session') {
      handleSession()
    }

    if (type === 'cookie') {
      handleCookie()
    }
  }, [toggle])

  return active
}
