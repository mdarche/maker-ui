import React from "react"
import { Layout, Header, Content, Main, SideNav, Footer } from "elements-ui"
import { Box } from "react-understudy"

import options from "./options"

// import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header>
      {/* <Navbar
        type="basic"
        logo={}
        menuItems={}
        variant=""
        widgetArea={}
        colorToggle
      /> */}
      Header
    </Header>
    <Content layout="sidenav-content">
      <SideNav>Secondary nav links</SideNav>
      <Main>{props.children}</Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>

  //TODO - add modal layer to Layout and let users access it with API
  // - Basic Nav, Split Nav, Centered Nav
)
