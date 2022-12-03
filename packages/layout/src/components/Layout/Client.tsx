'use client'

import { MakerUIOptions } from '@/types'
import React, { useState, useEffect } from 'react'

interface LayoutClientProps {
  options: MakerUIOptions
}

/**
 * This component stays active in the DOM tree and is used to detect the initial status / any changes to the layout.
 * @returns
 */
export const LayoutClient = ({
  options: { type, header, colorThemes, systemColorTheme, ...rest },
}: LayoutClientProps) => {
  const [state, setState] = useState({
    layoutType: type,
    navType: header.navType,
    mobileNavType: header.mobileNavType,
    colorTheme: '',
  })

  /** */

  /**
   * Set the initial color theme
   *
   * @remark To conform with `prefers-color-scheme`, make sure you explicitly
   * set color modes with `light` and `dark` keys.
   *
   */
  React.useEffect(() => {
    const systemDark = window?.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const systemLight = window?.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches

    //  If there are multiple color themes, save the active one to local storage
    if (colorThemes.length) {
      const storageKey = 'color-theme'
      const sessionCheck = localStorage.getItem(storageKey)

      const setDefaultTheme = () => {
        let theme = ''
        // Check for dark theme key and if user prefers dark mode
        if (
          systemColorTheme &&
          colorThemes.includes('dark') &&
          colorThemes.includes('light')
        ) {
          theme = 'system'
          document.body.dataset.theme = systemDark ? 'dark' : 'light'
          setState((s) => ({
            ...s,
            colorTheme: 'system',
          }))
        } else {
          const defaultTheme = colorThemes[0]
          theme = defaultTheme
          document.body.dataset.theme = defaultTheme
          setState((s) => ({ ...s, colorTheme: defaultTheme }))
        }

        localStorage.setItem(storageKey, JSON.stringify({ theme }))
      }

      if (sessionCheck) {
        // @ts-ignore
        const { theme } = JSON.parse(localStorage.getItem(storageKey))
        const colors = colorThemes
          ? [...(systemColorTheme ? ['system'] : []), ...colorThemes]
          : []

        if (colors.includes(theme)) {
          document.body.dataset.theme =
            theme === 'system' && systemDark
              ? 'dark'
              : theme === 'system' && systemLight
              ? 'light'
              : theme
          setState((s) => ({ ...s, colorTheme: theme }))
        } else {
          setDefaultTheme()
        }
      } else {
        setDefaultTheme()
      }
    } else {
      setState((s) => ({ ...s, colorTheme: 'undefined' }))
    }
  }, [colorThemes, systemColorTheme])

  useEffect(() => {
    // Any other event listeners that must be added to the window object
    // - Overlay 'active'
    // -
  }, [])

  /**
   * NOTE - ALL STYLES ADDED TO HEAD WILL BE MOVED TO SERVER WHEN
   * NEXT.JS LAYOUT API SUPPORTS <style> TAGS
   */
  useEffect(() => {
    // Add option based styles to document head
    // Add initial media query styles to document head
  }, [])

  return <></>
}
