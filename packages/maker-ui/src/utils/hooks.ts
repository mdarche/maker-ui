import merge from 'deepmerge'
import { useThemeUI } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useExtensions } from '../context/ExtendContext'
import { useMenu, useSideNav } from '../context/ActionContext'
import { validate } from './helper'

export function useMakerUI() {
  const [state, setState] = useExtensions()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const options = useOptions()

  function extendTheme(newTheme, key) {
    // Check if the component's key has already been added before updating context / causing a re-render

    if (key && state.themeKeys.includes(key)) {
      return
    }

    return setState(s => ({
      ...s,
      extendedTheme: merge(s.extendedTheme, validate(newTheme)),
    }))
  }

  function extendOptions(newOptions, key) {
    if (key && state.themeKeys.includes(key)) {
      return
    }

    return setState(s => ({
      ...s,
      extendedOptions: merge(s.extendedOptions, validate(newOptions)),
    }))
  }

  return {
    theme,
    colorMode,
    setColorMode,
    useMenu,
    useSideNav,
    extendTheme,
    options,
    extendOptions,
  }
}
