import React from "react"
import {
  Layout as ThemeLayout,
  Header,
  Main,
  Footer,
} from "gatsby-theme-elements"

const Layout = props => (
  <ThemeLayout>
    <Header />
    <Main {...props} />
    <Footer />
  </ThemeLayout>
)

export default Layout
