/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout as ThemeLayout } from "theme-ui"
import { Global } from "@emotion/core"
import { UIContextProvider } from "../context/UIContext"
import { MeasureContextProvider } from "../context/MeasureContext"
import reset from "../utils/reset"

const Layout = props => (
  <UIContextProvider>
    <MeasureContextProvider>
      <Global styles={reset} />
      <ThemeLayout {...props} />
    </MeasureContextProvider>
  </UIContextProvider>
)

export default Layout
