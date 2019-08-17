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

import SideMenu from "./SideMenu.js"
import Pagination from "./Pagination"
import { colorOptions } from "../utils/logo-colors"

export default ({ children, location }) => (
  <Layout>
    <Header justify="space-between" sx={{ p: 4 }}>
      <Logo height="35px" colorOptions={colorOptions} />
      <HeaderWidgets>
        <a
          href="https://github.com/mdarche/gatsby-theme-elements"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            color: "primary",
            fontSize: 3,
            textDecoration: "none",
            px: "25px",
          }}>
          Github
        </a>
        <ColorToggle
          sx={{
            border: "2px solid",
            background: "none",
            borderColor: "accent",
            color: "accent",
            fontFamily: "heading",
            fontSize: 3,
            p: "5px 15px",
          }}
        />
      </HeaderWidgets>
    </Header>
    <ContentWrapper layout="sidenav-content" sx={{ py: [2, 5] }}>
      <SideNav>
        <SideMenu />
      </SideNav>
      <Main>
        {children}
        <Pagination location={location.pathname} />
      </Main>
    </ContentWrapper>
    <SideNavToggle defaultIcon />
  </Layout>
)
