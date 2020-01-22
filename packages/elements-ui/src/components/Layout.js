import React from "react"
import { ThemeProvider, ColorMode, Styled } from "theme-ui"
import { Global } from "@emotion/core"

import { ElementsProvider } from "../context/ElementsContext"
import ElementsRoot from "./ElementsRoot"
import cssReset from "../utils/reset"
import mapOptions from "../utils/map-to-theme"

export default ({
  reset = cssReset,
  theme,
  options,
  globalStyles,
  children,
}) => (
  <ElementsProvider>
    <ThemeProvider theme={mapOptions(theme, options)}>
      <ColorMode />
      <Global styles={reset} />
      {globalStyles ? <Global styles={globalStyles} /> : null}
      <Styled.root>
        <ElementsRoot options={options}>{children}</ElementsRoot>
      </Styled.root>
    </ThemeProvider>
  </ElementsProvider>
)
