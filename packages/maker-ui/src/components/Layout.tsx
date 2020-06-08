import React from 'react'
import { ThemeProvider } from 'theme-ui'
import merge from 'deepmerge'

import { ExtensionProvider, useExtensions } from '../context/ExtendContext'
import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { Skiplinks } from './Skiplinks'
import themeMap from '../config/theme-map'

interface LayoutProps {
  theme: object
  options: object
  components?: object
  children: React.ReactNode
}

const Root = ({ theme, options = {}, components, children }: LayoutProps) => {
  const [{ extendedOptions, extendedTheme }] = useExtensions()
  const allOptions = merge(extendedOptions, options)

  return (
    <ThemeProvider
      theme={themeMap(theme, extendedTheme, allOptions)}
      components={components}>
      <OptionProvider options={allOptions}>
        <ActionProvider>
          <Skiplinks />
          {children}
        </ActionProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 * @see https://maker-ui.com/components/layout
 */

export const Layout = (props: LayoutProps) => (
  <ExtensionProvider>
    <Root {...props} />
  </ExtensionProvider>
)
