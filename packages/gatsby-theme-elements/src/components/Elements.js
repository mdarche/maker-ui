import React from "react"
import { ThemeProvider, ColorMode } from "theme-ui"

import { UIContextProvider } from "../context/UIContext"
import { MeasureProvider } from "../context/MeasureContext"
import Root from "./Root"
import theme from "../config/base-theme"

// TODO - Change theme via prop

export default props => (
  <ThemeProvider theme={theme}>
    <ColorMode />
    <UIContextProvider>
      <MeasureProvider>
        <Root {...props} />
      </MeasureProvider>
    </UIContextProvider>
  </ThemeProvider>
)
