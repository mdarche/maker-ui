/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout as ThemeLayout } from "theme-ui"
import { UIContextProvider } from "../context/UIContext"

const Layout = props => (
  <ThemeLayout>
    <UIContextProvider {...props} />
  </ThemeLayout>
)

export default Layout
