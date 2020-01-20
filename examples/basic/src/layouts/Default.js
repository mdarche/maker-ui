/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout, Header, ContentWrapper } from "elements-ui"

import options from "./options"

// import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header>Header</Header>
    <ContentWrapper>
      <h1>Test</h1>
      {props.children}
    </ContentWrapper>
  </Layout>
)
