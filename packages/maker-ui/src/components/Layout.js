import React from 'react'
import { ThemeProvider } from 'theme-ui'
import merge from 'deepmerge'

import { ExtensionProvider, useExtensions } from '../context/ExtendContext'
import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import Skiplinks from './Skiplinks'
import themeMap from '../config/theme-map'

const Layout = props => (
  <ExtensionProvider>
    <Root {...props} />
  </ExtensionProvider>
)

const Root = ({ theme, options, components, children }) => {
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

export default Layout
