import * as React from 'react'
import { ThemeProvider, Theme } from 'theme-ui'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { Skiplinks, Link } from './Skiplinks'
import { MakerOptions } from './types'
import { createTheme } from '../theme'

interface LayoutProps {
  children: React.ReactNode
  theme: Theme
  options: Partial<MakerOptions>
  components?: object
  skiplinks?: Link[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @see https://maker-ui.com/docs/layout
 */

export const Layout = ({
  theme = {},
  options = {},
  components,
  skiplinks,
  children,
}: LayoutProps) => {
  return (
    <ThemeProvider
      theme={createTheme(theme, options)}
      // @ts-ignore
      components={components}>
      <OptionProvider options={options}>
        <ActionProvider>
          <Skiplinks links={skiplinks} />
          {children}
        </ActionProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}
