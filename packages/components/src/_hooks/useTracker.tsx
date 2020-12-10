import { useState, useEffect } from 'react'

interface TrackerProps {
  type?: 'session' | 'cookie'
  key?: string
  show?: boolean
  expiration?: number
}

export function useTracker({
  type,
  key,
  show,
  expiration,
}: TrackerProps): boolean {
  const [active, set] = useState(true)
  const delay = () => {
    setTimeout(() => {
      set(false)
    }, 1000)
  }

  useEffect(() => {
    // Use session storage

    if (type === 'session') {
      const sessionCheck = sessionStorage.getItem(key)

      if (show && sessionCheck) {
        return set(false)
      }
      if (!show && !sessionCheck) {
        delay()
        return sessionStorage.setItem(key, 'true')
      }
    }

    // Use cookie storage

    if (type === 'cookie') {
      const cookieCheck = document.cookie
        .split(';')
        .some(i => i.trim().startsWith(key))

      if (show && cookieCheck) {
        return set(false)
      }
      if (!show && !cookieCheck) {
        delay()
        document.cookie = `${key}=true;expires=${expiration};path=/`
      }
    }
  }, [show, type, expiration, key])

  return active
}
