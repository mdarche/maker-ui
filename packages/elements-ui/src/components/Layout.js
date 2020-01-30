import React from 'react'
import { ThemeProvider, Styled } from 'theme-ui'
import { Global } from '@emotion/core'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import Skiplinks from './Skiplinks'
import cssReset from '../config/reset'
import optionMap from '../config/theme-map'

export const Layout = ({ theme, options, reset = cssReset, children }) => (
  <ThemeProvider theme={optionMap(theme, options)}>
    <OptionProvider options={options}>
      <ActionProvider>
        <Global styles={reset} />
        <Styled.root>
          <Skiplinks />
          {children}
        </Styled.root>
      </ActionProvider>
    </OptionProvider>
  </ThemeProvider>
)
