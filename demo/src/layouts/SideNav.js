/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import {
  Root as ThemeLayout,
  Header,
  NavMenu,
  Main,
  Topbar,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import { SideAds } from "react-understudy"

const menuItems = ["Home", "About", "Source", "Contact"]

const Layout = props => (
  <ThemeLayout>
    <Topbar>
      <div sx={{ width: 2000 }}>Test</div>
    </Topbar>
    <Header borderBottom="none">
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
      <Main sideNav={true} paddingTop="5em" maxWidth={1000}>
        <div>
          <Styled.h1>Test H1</Styled.h1>
          {props.children}
        </div>
      </Main>
      <SideNavToggle sx={{ bg: "#000", borderRadius: "50%", bottom: 80 }}>
        Test
      </SideNavToggle>
    </div>
    <TabBar>
      <div>Test</div>
    </TabBar>
  </ThemeLayout>
)

export default Layout
