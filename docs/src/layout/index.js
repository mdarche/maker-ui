/** @jsx jsx */
import { jsx } from "theme-ui"
import {
  Layout,
  Header,
  Logo,
  ColorToggle,
  ContentWrapper,
  Main,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import SideMenu from "./SideMenu.js"

export default ({ children }) => (
  <Layout>
    <Header justify="space-between">
      <Logo />
      <div sx={{ display: "flex" }}>
        <ColorToggle />
      </div>
    </Header>
    <ContentWrapper layout="sidenav-content" sx={{ pt: 5 }}>
      <SideNav>Side Nav</SideNav>
      <Main>{children}</Main>
    </ContentWrapper>
    <SideNavToggle />
  </Layout>
)
