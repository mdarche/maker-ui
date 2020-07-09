import React from 'react'
import { ThemeProvider } from 'theme-ui'
import merge from 'deepmerge'

import { ExtensionProvider, useExtensions } from '../context/ExtendContext'
import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { Skiplinks, Link } from './Skiplinks'
import themeMap from '../config/theme-map'

interface LayoutProps {
  children: React.ReactNode
  theme: object
  options: object
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
  const [{ extendedOptions, extendedTheme }] = useExtensions()
  const allOptions = merge(extendedOptions, options)

  return (
    <ThemeProvider
      theme={themeMap(theme, extendedTheme, allOptions)}
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
  <ExtensionProvider>
    <Root {...props} />
  </ExtensionProvider>
)
