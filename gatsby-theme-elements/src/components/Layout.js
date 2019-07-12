/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout as ThemeLayout } from "theme-ui"
import { Global } from "@emotion/core"
import { UIContextProvider } from "../context/UIContext"
import reset from "../utils/reset"

const Layout = props => (
  <UIContextProvider>
    <Global styles={reset} />
    <ThemeLayout {...props} />
  </UIContextProvider>
)

export default Layout
