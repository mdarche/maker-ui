import React from "react"
import { ThemeProvider, ColorMode } from "theme-ui"

import { UIContextProvider } from "../context/UIContext"
import { MeasureContextProvider } from "../context/MeasureContext"
import Root from "./Root"
import theme from "../config/baseTheme"

export default props => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <UIContextProvider>
      <MeasureContextProvider>
        <Root {...props} />
      </MeasureContextProvider>
    </UIContextProvider>
  </ThemeProvider>
)
