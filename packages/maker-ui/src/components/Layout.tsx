import * as React from 'react'
import { ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/react'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { ErrorBoundary } from './Errors'
import { MakerOptions } from '../types'
import { createTheme } from '../theme'

import { globalStyles } from '../utils/styles'
import { colorVars, themeVars } from '../utils/css-builder'

interface LayoutProps {
  children: React.ReactNode
  theme: object
  options: Partial<MakerOptions>
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @see https://maker-ui.com/docs/layout/layout
 */

export const Layout = ({
  theme = {},
  options = {},
  skiplinks,
  children,
}: LayoutProps) => {
  return (
    <ThemeProvider theme={createTheme(theme, options)}>
      <Global styles={colorVars(options.colors)} />
      <Global styles={themeVars(options)} />
      <Global styles={globalStyles} />
      <OptionProvider options={options}>
        <LayoutProvider>
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
