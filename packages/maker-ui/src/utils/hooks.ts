import merge from 'deepmerge'
import { useThemeUI, Theme } from 'theme-ui'

import { useOptions } from '../context/OptionContext'
import { useExtensions } from '../context/ExtendContext'
import { useMenu, useSideNav } from '../context/ActionContext'
import { validate } from './helper'

export function useMakerUI() {
  const [state, setState] = useExtensions()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const options = useOptions()

  /**
   * Allows child themes, plugins, and external components to merge custom
   * variants with the base theme (no need for additional theme providers).
   *
   * @param newTheme - a Theme UI theme object
   * @param key - a unique string that helps determine whether
   * or not the new theme styles have been included.
   * @param overwrite - lets the user override previously declared theme values
   * associated with the key
   *
   */

  function extendTheme(newTheme: Theme, key?: string, overwrite?: boolean) {
    // Check if the component's key has already been added before updating context / causing a re-render

    if (key && state.themeKeys.includes(key)) {
      return
    }

    return setState(s => ({
      ...s,
      extendedTheme: overwrite
        ? validate(newTheme)
        : merge(s.extendedTheme, validate(newTheme)),
    }))
  }

  /**
   * Allows child themes, plugins, and external components to overwrite
   * the Maker UI options object.
   *
   * @param newOptions - a Maker UI options object
   * @param key - a unique string that helps determine whether
   * or not the new options have been included.
   *
   */

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
