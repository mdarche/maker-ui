import * as React from 'react'
import merge from 'deepmerge'
import { ThemeProvider, Theme } from '@emotion/react'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { MakerUIOptions, MakerOptions } from '../types'

interface LayoutProps {
  children: React.ReactNode
  options: MakerUIOptions
  styles?: object
  theme?: Theme
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
