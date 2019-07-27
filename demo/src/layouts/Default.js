/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

const menuItems = [
  { label: "Default", path: "/" },
  { label: "Side Nav", path: "/sidenav" },
  { label: "Sidebar Left", path: "/left-sidebar" },
  { label: "Sidebar Right", path: "/right-sidebar" },
  { label: "Full Width", path: "/full-width" },
]

export default props => (
  <Layout>
    <Header>
      <div className="logo">Logo</div>
      <NavMenu>
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link sx={{ p: 3 }} to={path}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
      <MenuToggle icon="menu" />
    </Header>
    <MobileNav defaultClose />
    <Main>
      <div>{props.children}</div>
    </Main>
    <Footer sx={{ textAlign: "center" }}>© 2019 mkdarshay</Footer>
  </Layout>
)
