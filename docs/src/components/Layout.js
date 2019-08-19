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
import { ReactComponent as GithubLogo } from "../assets/github.svg"

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
          <GithubLogo sx={{ height: "24px", fill: "currentColor" }} />
        </a>
        <ColorToggle
          sx={{
            border: "2px solid",
            borderRadius: "2px",
            background: "none",
            borderColor: "primary",
            color: "primary",
            fontFamily: "heading",
            fontSize: ".95em",
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
