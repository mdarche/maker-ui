/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import {
  Root as ThemeLayout,
  Header,
  NavMenu,
  Main,
  Topbar,
  Footer,
  WidgetArea,
  MenuToggle,
  MobileNav,
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
      <MenuToggle icon="menu" />
      <MobileNav defaultClose />
    </Header>
    <Main>
      <div>
        <SideAds />
      </div>
      <div>{props.children}</div>
    </Main>
    <Footer>
      <WidgetArea>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
      </WidgetArea>
      Copyright 2019
    </Footer>
  </ThemeLayout>
)

export default Layout
