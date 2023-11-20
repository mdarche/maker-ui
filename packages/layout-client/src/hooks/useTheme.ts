import { useContext } from 'react'
import { ThemeContext, setBrowserTheme } from '../components/ThemeProvider'

/**
 * This hook provides access to the current color theme and a function to
 * change the theme (consumed by `ColorButton`).
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider or LayoutProvider'
    )
  }

  const { theme, options, setTheme } = context

  function setColorTheme(value: string) {
    setBrowserTheme(value, options) // Handles DOM
    setTheme(value) // Handles state
  }

  return { theme, setColorTheme, options }
}
