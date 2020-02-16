import React from 'react'
import { ThemeProvider } from 'theme-ui'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import Skiplinks from './Skiplinks'
import themeMap from '../config/theme-map'

const Wrapper = React.memo(({ children }) => children)

export const Layout = ({ theme, options, components, children }) => (
  <ThemeProvider theme={themeMap(theme, options)} components={components}>
    <OptionProvider options={options}>
      <ActionProvider>
        <Skiplinks />
        <Wrapper>{children}</Wrapper>
      </ActionProvider>
    </OptionProvider>
  </ThemeProvider>
)
