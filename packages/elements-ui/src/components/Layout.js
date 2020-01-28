import React, { useEffect } from 'react'
import { ThemeProvider, Styled } from 'theme-ui'
import { Global } from '@emotion/core'

import { ElementsProvider, useOptionsUpdater } from '../context/ElementsContext'
import { ModalProvider } from '../context/ModalContext'
import Skiplinks from './Skiplinks'
import cssReset from '../utils/reset'
import optionMap from '../utils/option-map'

const Root = ({ options, children }) => {
  const setOptions = useOptionsUpdater()

  useEffect(() => {
    if (options !== undefined) {
      setOptions(options)
    }
  }, [setOptions, options])

  return children
}

export const Layout = ({
  reset = cssReset,
  theme,
  options,
  removeStyling,
  globalStyles,
  children,
}) => (
  <ElementsProvider>
    <ThemeProvider theme={optionMap(theme, options, removeStyling)}>
      <Global styles={reset} />
      {globalStyles ? <Global styles={globalStyles} /> : null}
      <ModalProvider>
        <Styled.root>
          <Root options={options}>
            <Skiplinks />
            {children}
          </Root>
        </Styled.root>
      </ModalProvider>
    </ThemeProvider>
  </ElementsProvider>
)
