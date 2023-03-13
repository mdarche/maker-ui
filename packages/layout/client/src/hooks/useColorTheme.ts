import { useContext } from 'react'
import { LayoutContext } from '../components/LayoutProvider'
import { setBrowserTheme } from '../utils'

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
