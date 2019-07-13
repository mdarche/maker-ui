import React from "react"
import {
  Layout as ThemeLayout,
  Header,
  Main,
  Topbar,
  Footer,
} from "gatsby-theme-elements"

const Layout = props => (
  <ThemeLayout>
    <Topbar>Topbar content</Topbar>
    <Header>
      <div className="logo">Logo</div>
      <ul className="menu">
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
      </ul>
    </Header>
    <Main>
      <div>Sidebar</div>
      <div>{props.children}</div>
    </Main>
    <Footer />
  </ThemeLayout>
)

export default Layout
