'use client'

import { useState, useEffect, createContext } from 'react'

export const ThemeContext = createContext({
  theme: '',
  options: [] as string[],
  setTheme: (t: string) => {},
})

/**
 * A client provider that sets the initial color theme and provides a the context
 * for a hook that can be used by components to change the theme.
 */
export const ThemeProvider = ({
  children,
  options = [],
}: {
  children: React.ReactNode
  options?: string[]
}) => {
  const [theme, setTheme] = useState('')

  /**
   * Set the initial color theme
   */
  useEffect(() => {
    const key = 'color-theme'
    if (typeof localStorage !== 'undefined' && options.length) {
      const sessionCheck = localStorage.getItem(key) || '{}'
      const { theme } = JSON.parse(sessionCheck)
      const exists = options.includes(theme)

      setBrowserTheme(exists ? theme : 'default', options, exists)
      setTheme(exists ? theme : options[0])
    } else {
      setBrowserTheme('default')
      setTheme(options[0])
    }
  }, [options])

  return (
    <ThemeContext.Provider value={{ theme, options, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Set the color theme in the browser and local storage.
 *
 * @param value the theme value to set
 * @param setStorage an optional boolean to set local storage
 */
export function setBrowserTheme(
  value: string | 'default',
  options: string[] = [],
  setStorage = true
) {
  if (typeof window === 'undefined' || !options.length) return
  const key = 'color-theme'
  let t = ''
  const dark = window?.matchMedia('(prefers-color-scheme: dark)').matches

  if (value === 'system') {
    t = dark ? 'dark' : 'light'
  } else if (value === 'default') {
    t = options[0]
  } else {
    t = value
  }
  document.body.dataset.theme = t
  if (setStorage && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify({ theme: value }))
    } catch (error) {
      console.error('Failed to save theme in localStorage:', error)
    }
  }
}
