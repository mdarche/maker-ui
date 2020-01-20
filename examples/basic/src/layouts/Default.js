/** @jsx jsx */
import { jsx } from "theme-ui"
import { Layout, Header } from "elements-ui"

// import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header>Header</Header>
    <h1>Test</h1>
    {props.children}
  </Layout>
)
