import React from 'react'
import { ThemeProvider } from 'theme-ui'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import Skiplinks from './Skiplinks'
import themeMap from '../config/theme-map'

const Layout = ({ theme, options, components, children }) => (
  <ThemeProvider theme={themeMap(theme, options)} components={components}>
    <OptionProvider options={options}>
      <ActionProvider>
        <Skiplinks />
        {children}
      </ActionProvider>
    </OptionProvider>
  </ThemeProvider>
)

export default Layout
