import React from "react"
import {
  Layout,
  Header,
  ContentWrapper as Content,
  Main,
  Sidebar,
  Footer,
} from "elements-ui"

import options from "./options"

// import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header>
      Basic Nav
      {/* <BasicNav menuItems={} logo={} widgetArea={} /> */}
    </Header>
    <Content layout="sidebar-content">
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <h1>Test</h1>
        {props.children}
      </Main>
    </Content>
    <Footer>Footer</Footer>
  </Layout>

  //TODO - add modal layer to Layout and let users access it with API
  // - Basic Nav, Split Nav, Centered Nav
)
