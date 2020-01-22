import React from "react"
import {
  Layout,
  Header,
  Navbar,
  MobileNav,
  Content,
  Main,
  Sidebar,
  Footer,
} from "elements-ui"
import { Box } from "react-understudy"

import { menuItems } from "./options"

export default props => (
  <Layout>
    <Header>
      <Navbar menu={menuItems} />
      <MobileNav />
    </Header>
    <Content layout="sidebar-content">
      <Sidebar>
        <Box height="400px" />
      </Sidebar>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)
