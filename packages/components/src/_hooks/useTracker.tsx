import { useState, useEffect } from 'react'

export function useTracker(type, key, toggle, expiration) {
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

      if (toggle && sessionCheck) {
        return set(false)
      }
      if (!toggle && !sessionCheck) {
        delay()
        return sessionStorage.setItem(key, 'true')
      }
    }

    // Use cookie storage

    if (type === 'cookie') {
      const cookieCheck = document.cookie
        .split(';')
        .some(i => i.trim().startsWith(key))

      if (toggle && cookieCheck) {
        return set(false)
      }
      if (!toggle && !cookieCheck) {
        delay()
        document.cookie = `${key}=true;expires=${expiration};path=/`
      }
    }
  }, [toggle, type, expiration, key])

  return active
}
