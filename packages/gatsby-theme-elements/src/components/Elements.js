import React from "react"
import { ThemeProvider, ColorMode } from "theme-ui"

import { ElementsProvider } from "../context/ElementsContext"
import { MeasureProvider } from "../context/MeasureContext"
import Root from "./Root"
import theme from "../config/base-theme"

// TODO - Change theme via prop

export default props => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <ElementsProvider>
      <MeasureProvider>
        <Root {...props} />
      </MeasureProvider>
    </ElementsProvider>
  </ThemeProvider>
)
