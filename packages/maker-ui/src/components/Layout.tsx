import React from 'react'
import { ThemeProvider, Theme } from 'theme-ui'
import merge from 'deepmerge'

import { ExtensionProvider, useExtensions } from '../context/ExtendContext'
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

const Root = ({
  theme,
  options = {},
  components,
  skiplinks,
  children,
}: LayoutProps) => {
  // const [{ extendedOptions, extendedTheme }] = useExtensions()
  const allOptions = merge({}, options)

  return (
    <ThemeProvider
      theme={createTheme(theme, {}, allOptions)}
      // @ts-ignore
      components={components}>
      <OptionProvider options={allOptions}>
        <ActionProvider>
          <Skiplinks links={skiplinks} />
          {children}
        </ActionProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @see https://maker-ui.com/docs/layout
 */

export const Layout = (props: LayoutProps) => (
  // <ExtensionProvider>
  <Root {...props} />
)
