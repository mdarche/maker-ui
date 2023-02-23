import { useState, useEffect } from 'react'
import { merge } from '@maker-ui/utils'

type StorageType = 'session' | 'local' | 'cookie'

export type StorageProps = {
  /** The key used to store the value in the browser */
  key: string
  /** The initial value of the storage item */
  value?: string | object
  /** The browser tracking method, session or cookie */
  type?: StorageType
  /** A time in milliseconds that determines when the item will expire. Not used for
   * session storage.
   */
  expires?: number
  /** The number of days that this item should be stored. Not used for session storage.  */
  expireDays?: number
}

/**
 * The `useStorage` hook lets you create a session token or a cookie to save helpful information
 * or dynamically show / hide a component.
 *
 * @param key{string} - The key used to store the value in the browser
 * @param initialvalue{string} - The initial value of the storage item
 * @param options{StorageOptions} - Custom options for the storage item
 *
 * @returns {string | false} - The value of the storage item or false if it has expired
 *
 */
export function useStorage(props: StorageProps): string | object | false {
  const now = new Date()
  const { key, value, type, expires, expireDays } = merge(
    { type: 'local', expireDays: 30 },
    props
  ) as StorageProps

  const exp =
    expires || now.getTime() + (expireDays as number) * 24 * 60 * 60 * 1000

  const [saved, setSaved] = useState<string | null>(() => getItem())

  function getItem() {
    if (type === 'session') {
      return getSessionStorage(key)
    }
    if (type === 'local') {
      return getLocalStorage(key)
    }
    return getCookie(key)
  }

  useEffect(() => {
    if (saved !== null) return
    if (value) {
      const v = typeof value === 'object' ? JSON.stringify(value) : value
      if (type === 'session') {
        window.sessionStorage.setItem(key, v)
      }
      if (type === 'local') {
        localStorage.setItem(key, JSON.stringify({ value, expires: exp }))
      }
      if (type === 'cookie') {
        const expDate = new Date(exp).toUTCString()
        document.cookie = `${key}=${v};expires=${expDate};path=/`
      }

      setSaved(v)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved])

  useEffect(() => {
    if (saved === null) return
    setSaved(getItem())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, type])

  // Format back to object if necessary, otherwise return string
  try {
    return saved ? JSON.parse(saved) : false
  } catch (err) {
    return saved || false
  }
}

function isExpired(expires: number | string) {
  return new Date(expires) < new Date()
}

function getSessionStorage(key: string) {
  const item = window.sessionStorage.getItem(key)
  return item || null
}

function getLocalStorage(key: string) {
  const item = window.localStorage.getItem(key)
  if (!item) return null
  const { value, expires } = JSON.parse(item)
  if (isExpired(expires)) return null
  return JSON.stringify(value)
}

function getCookie(key: string) {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim())
  const cookie = cookies.find((cookie) => cookie.startsWith(`${key}=`))
  if (!cookie) return null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, value, expires] = cookie.split('=')
  if (isExpired(expires)) return null
  return value
}
