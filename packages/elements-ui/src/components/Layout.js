import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import Skiplinks from './Skiplinks'
import cssReset from '../config/reset'
import themeMap from '../config/theme-map'

export const Layout = ({
  theme,
  options,
  components,
  // reset = cssReset,
  children,
}) => (
  <ThemeProvider theme={themeMap(theme, options)} components={components}>
    <OptionProvider options={options}>
      <ActionProvider>
        {/* <Global styles={reset} /> */}
        <Skiplinks />
        {children}
      </ActionProvider>
    </OptionProvider>
  </ThemeProvider>
)
