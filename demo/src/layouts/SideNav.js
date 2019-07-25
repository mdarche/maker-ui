/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import {
  Root as ThemeLayout,
  Header,
  NavMenu,
  Main,
  Topbar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import { SideAds } from "react-understudy"

const menuItems = ["Home", "About", "Source", "Contact"]

const Layout = props => (
  <ThemeLayout>
    <Topbar>Topbar content</Topbar>
    <Header>
      <div className="logo">Logo</div>
      <NavMenu
        sx={{
          a: {
            p: 3,
          },
        }}
      >
        {menuItems.map(item => (
          <li key={item}>
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </NavMenu>
    </Header>
    <div
      sx={{
        display: "flex",
      }}
    >
      <SideNav>
        <SideAds adHeights={[600, 250]} />
      </SideNav>
      <Main sideNav={true} paddingTop="0">
        <div>{props.children}</div>
      </Main>
      <SideNavToggle sx={{ bg: "#000", borderRadius: "50%" }}>
        Test
      </SideNavToggle>
    </div>
  </ThemeLayout>
)

export default Layout
