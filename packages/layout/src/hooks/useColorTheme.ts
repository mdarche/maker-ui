import { useState, useEffect } from 'react'

export function useColorTheme() {
  const [preference, setPreference] = useState('')
  const [current, setCurrent] = useState('')
  const [themes, setThemes] = useState<string[]>([])

  useEffect(() => {
    // TODO
    // Read and parse themes from CSS variable
  }, [])

  useEffect(() => {
    if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      setPreference('dark')
    }
    if (window?.matchMedia('(prefers-color-scheme: light)').matches) {
      setPreference('light')
    }
  }, [])

  const systemDark = preference === 'dark' && themes?.includes('dark')
  const systemLight = preference === 'light' && themes?.includes('light')

  function setColorTheme(theme: string) {
    localStorage.setItem('color-theme', JSON.stringify({ theme }))

    document.body.dataset.theme =
      theme === 'system' && systemDark
        ? 'dark'
        : theme === 'system' && systemLight
        ? 'light'
        : theme
    setCurrent((s) => theme)
  }

  return { themes, current, setColorTheme, preference }
}
