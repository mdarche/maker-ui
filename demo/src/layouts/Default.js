/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Box } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  WidgetArea,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
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
      <div id="content">{props.children}</div>
    </Main>
    <Footer>
      <WidgetArea sx={{ pt: "30px" }}>
        <Box height="200px" />
        <Box height="200px" />
        <Box height="200px" />
      </WidgetArea>
    </Footer>
  </Layout>
)
