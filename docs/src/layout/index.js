/** @jsx jsx */
import { jsx } from "theme-ui"
import {
  Layout,
  Header,
  Logo,
  ColorToggle,
  ContentWrapper,
  HeaderWidgets,
  Main,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import SideMenu from "./side-menu.js"

export default ({ children }) => (
  <Layout>
    <Header justify="space-between" sx={{ p: 4 }}>
      <Logo height="35px" />
      <HeaderWidgets>
        <ColorToggle
          sx={{
            border: "2px solid",
            background: "none",
            borderColor: "primary",
            fontFamily: "heading",
            fontSize: 3,
            p: "5px 10px",
          }}
        />
      </HeaderWidgets>
    </Header>
    <ContentWrapper layout="sidenav-content" sx={{ pt: 5 }}>
      <SideNav>
        <SideMenu />
      </SideNav>
      <Main>{children}</Main>
    </ContentWrapper>
    <SideNavToggle />
  </Layout>
)
