import * as React from 'react'
import { merge } from '@maker-ui/utils'
import { ThemeProvider, type Theme } from '@maker-ui/css'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import type { MakerUIOptions, MakerOptions } from '../types'

interface LayoutProps {
  children: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options: MakerUIOptions
  /** Optional global responsive styles that abide by `options.breakpoints` */
  styles?: object
  /**
   * Optional Emotion Theme provider.
   * @link https://emotion.sh/docs/theming
   */
  theme?: Theme
  /**
   * Replaces the default Maker UI skiplinks with your own custom on-page links.
   * You don't need to add `#` to your id selectors:
   *
   * @example
   * [
   *  { id: 'main-content', label: 'Skip to main content' },
   *  { id: 'footer', label: 'Skip to footer' },
   * ]
   */
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @link https://maker-ui.com/docs/layout/layout
 */
export const Layout = ({
  options,
  styles,
  theme = {},
  skiplinks,
  children,
}: LayoutProps) => {
  return (
    <ThemeProvider
      theme={
        options.breakpoints
          ? merge(theme, { breakpoints: options.breakpoints })
          : theme
      }>
      <OptionProvider options={options as MakerOptions}>
        <LayoutProvider styles={styles}>
          <ActionProvider>
            <Skiplinks links={skiplinks} />
            {children}
          </ActionProvider>
        </LayoutProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}

Layout.displayName = 'MakerUI_Layout'
