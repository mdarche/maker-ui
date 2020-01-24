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
import theme from "./theme"

export default props => (
  <Layout theme={theme}>
    <Header>
      <Navbar type="minimal-center" menu={menuItems} />
      <MobileNav />
    </Header>
    <Content layout="sidebar-content" sx={{ pt: 4 }}>
      <Sidebar>
        <Box height="400px" />
      </Sidebar>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)
