import React from "react"
import { ThemeProvider, ColorMode, Styled } from "theme-ui"
import { Global } from "@emotion/core"

import { ElementsProvider } from "../context/ElementsContext"
import { MeasureProvider } from "../context/MeasureContext"
import ElementsRoot from "./ElementsRoot"
import cssReset from "../utils/reset"

export default ({
  theme,
  globalStyles,
  reset = cssReset,
  options,
  children,
}) => (
  <ElementsProvider>
    <MeasureProvider>
      <ThemeProvider theme={theme}>
        <ColorMode />
        <Global styles={reset} />
        {globalStyles !== null ? <Global styles={globalStyles} /> : null}
        <Styled.root>
          <ElementsRoot options={options}>{children}</ElementsRoot>
        </Styled.root>
      </ThemeProvider>
    </MeasureProvider>
  </ElementsProvider>
)
