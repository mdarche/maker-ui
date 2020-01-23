import React from "react"
import { ThemeProvider, Styled } from "theme-ui"
import { Global } from "@emotion/core"

import { ElementsProvider } from "../context/ElementsContext"
import { ModalProvider } from "../context/ModalContext"
import ElementsRoot from "./ElementsRoot"
import cssReset from "../utils/reset"
import optionMap from "../utils/option-map"

export default ({
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
          <ElementsRoot options={options}>{children}</ElementsRoot>
        </Styled.root>
      </ModalProvider>
    </ThemeProvider>
  </ElementsProvider>
)
