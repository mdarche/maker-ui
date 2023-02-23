import { useState, useEffect } from 'react'
import { merge } from '@maker-ui/utils'

type StorageType = 'session' | 'cookie'

export type StorageOptions = {
  /** The browser tracking method, session or cookie */
  type: StorageType
  /** A number in milliseconds that determines how long the tracker is active. Use this if you don't want to use the `expireDays` options */
  expires?: number
  /** The number of days that this item should be stored. */
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
export function useStorage(
  key: string,
  initialValue: string,
  options?: Partial<StorageOptions>
): string | false {
  const now = new Date()
  const { type, expireDays, expires } = merge(
    { type: 'session', expireDays: 1 },
    options || {}
  ) as Required<StorageOptions>
  const exp = expires || now.getTime() + expireDays * 24 * 60 * 60 * 1000

  const [value] = useState(() => {
    if (type === 'session') {
      return window.sessionStorage.getItem(key) ?? initialValue
    } else {
      return getCookie(key) ?? initialValue
    }
  })

  useEffect(() => {
    if (type === 'session') {
      window.sessionStorage.setItem(key, value)
    } else {
      setCookie(key, value, exp)
    }
  }, [key, value, type, exp])

  const savedValue =
    type === 'session' ? window.sessionStorage.getItem(key) : getCookie(key)

  console.log(
    'From inside hook',
    type,
    expireDays,
    expires,
    key,
    initialValue,
    window.sessionStorage
  )

  if (!savedValue) {
    return false
  }

  const { value: storedValue, expireTime } = JSON.parse(savedValue)

  if (expireTime && new Date().getTime() > expireTime) {
    return false
  }

  return storedValue as string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, expireTime: number): void {
  const expireDate = new Date(expireTime).toUTCString()
  document.cookie = `${name}=${value};expires=${expireDate};path=/`
}
