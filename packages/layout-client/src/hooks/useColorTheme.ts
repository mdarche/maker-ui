import { useContext } from 'react'
import { LayoutContext } from '../components'

/**
 * Utility that ensures all values in an array exist in a target array.
 */
function allExist(arr: string[], values: string[]) {
  return values.every((value) => {
    return arr.indexOf(value) !== -1
  })
}

export function setBrowserTheme(
  value: string | 'default',
  themes: string[],
  setStorage = true
) {
  if (window === undefined) return
  const key = 'color-theme'
  let t = ''
  const dark = window?.matchMedia('(prefers-color-scheme: dark)').matches

  if (value === 'system' && allExist(themes, ['system', 'dark', 'light'])) {
    t = dark ? 'dark' : 'light'
  } else if (value === 'default') {
    t = themes[0]
  } else {
    t = value
  }
  document.body.dataset.theme = t
  if (setStorage) {
    localStorage.setItem(key, JSON.stringify({ theme: value }))
  }
}

export function useColorTheme() {
  const {
    state: { colorTheme, options },
    dispatch,
  } = useContext(LayoutContext)

  function setColorTheme(theme: string) {
    setBrowserTheme(theme, options?.colorThemes || [])
    dispatch({ type: 'SET_COLOR_THEME', value: theme })
  }

  return {
    themes: options?.colorThemes || [],
    current: colorTheme,
    setColorTheme,
  }
}
