/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Box, SideAds } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  Topbar,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
    <Topbar>Optional topbar</Topbar>
    <Header>
      <div id="logo">
        <Box height="45px" width="230px" mb="0" />
      </div>
      <div
        id="nav-area"
        sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <NavMenu>
          {menuItems.map(({ label, path }) => (
            <li key={label}>
              <Link sx={{ p: 3 }} to={path}>
                {label}
              </Link>
            </li>
          ))}
        </NavMenu>
        <ColorToggle modes={["light", "dark"]} />
      </div>
      <MenuToggle icon="menu" />
    </Header>
    <MobileNav defaultClose />
    <Main>
      <aside id="sidebar">
        <SideAds adHeights={[250, 600]} />
      </aside>
      <div id="content">{props.children}</div>
    </Main>
    <Footer>Footer Text</Footer>
  </Layout>
)
