import * as React from 'react'
import merge from 'deepmerge'
import { ThemeProvider } from '@maker-ui/css'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { ErrorBoundary } from './Errors'
import { MakerOptions } from '../types'

/** @todo add type to styles and theme */
interface LayoutProps {
  children: React.ReactNode
  options: Partial<MakerOptions>
  styles?: object
  theme?: object
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @see https://maker-ui.com/docs/layout/layout
 */

export const Layout = ({
  options = {},
  styles = {},
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
      <OptionProvider options={options}>
        <LayoutProvider styles={styles}>
          <ActionProvider>
            <Skiplinks links={skiplinks} />
            <ErrorBoundary errorKey="layout">{children}</ErrorBoundary>
          </ActionProvider>
        </LayoutProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}

Layout.displayName = 'MakerUI_Layout'
