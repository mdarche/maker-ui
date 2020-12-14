import { useState, useEffect } from 'react'

interface TrackerProps {
  type?: 'session' | 'cookie'
  storageKey?: string
  show?: boolean
  expiration?: number
}

/**
 * The `useTracker` hook lets you create a session token or a cookie to conditionally
 * show or hide a component.
 *
 */

export function useTracker({
  type,
  storageKey,
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
    /**
     * Use session storage
     */

    if (type === 'session') {
      const sessionCheck = sessionStorage.getItem(storageKey)

      if (show && sessionCheck) {
        return set(false)
      }
      if (!show && !sessionCheck) {
        delay()
        return sessionStorage.setItem(storageKey, 'true')
      }
    }

    /**
     * Use cookie storage
     */

    if (type === 'cookie') {
      const cookieCheck = document.cookie
        .split(';')
        .some(i => i.trim().startsWith(storageKey))

      if (show && cookieCheck) {
        return set(false)
      }
      if (!show && !cookieCheck) {
        delay()
        document.cookie = `${storageKey}=true;expires=${expiration};path=/`
      }
    }
  }, [show, type, expiration, storageKey])

  return active
}
