/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { SideAds } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Topbar,
  Footer,
  WidgetArea,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

const menuItems = ["Home", "About", "Source", "Contact"]

export default props => (
  <Layout>
    <Topbar>Topbar content</Topbar>
    <Header sticky={false}>
      <div className="logo">Logo</div>
      <NavMenu
        sx={{
          a: {
            p: 3,
          },
        }}>
        {menuItems.map(item => (
          <li key={item}>
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </NavMenu>
      <MenuToggle icon="menu" />
    </Header>
    <MobileNav animation="slideLeft" defaultClose />
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
  </Layout>
)
