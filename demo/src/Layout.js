import React from "react"
import {
  Layout as ThemeLayout,
  Header,
  Main,
  Sidebar,
  Topbar,
  Footer,
} from "gatsby-theme-elements"

const Layout = props => (
  <ThemeLayout>
    <Topbar>Topbar content</Topbar>
    <Header>
      <div className="logo">Logo</div>
      <ul className="menu">
        <li>
          <a>Test</a>
        </li>
        <li>
          <a>Test</a>
        </li>
        <li>
          <a>Test</a>
        </li>
        <li>
          <a>Test</a>
        </li>
      </ul>
    </Header>
    <Main>
      <div className="content">{props.children}</div>
      <Sidebar>
        <div>Sidebar area</div>
      </Sidebar>
    </Main>
    <Footer />
  </ThemeLayout>
)

export default Layout
