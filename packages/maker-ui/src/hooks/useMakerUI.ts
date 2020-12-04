import { useThemeUI } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

export function useMakerUI() {
  const { theme, colorMode, setColorMode } = useThemeUI()
  const options = useOptions()

  return {
    theme,
    options,
    colorMode,
    setColorMode,
    useMenu,
    useSideNav,
  }
}
