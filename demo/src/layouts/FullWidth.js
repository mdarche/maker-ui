/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Box } from "react-understudy"
import {
  Layout,
  Topbar,
  Header,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  MobileNav,
  WidgetArea,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
    <Topbar>Let's try a split nav menu</Topbar>
    <Header sticky={false} justify="center">
      <NavMenu width="350px" justify="flex-end">
        {menuItems.slice(0, 3).map(({ label, path }) => (
          <li key={label}>
            <Link sx={{ p: 3 }} to={path}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
      <div id="logo" sx={{ px: [0, "30px"] }}>
        <Box height="60px" width="230px" mb="0" />
      </div>
      <NavMenu width="350px">
        {menuItems.slice(3, 5).map(({ label, path }) => (
          <li key={label}>
            <Link sx={{ p: 3 }} to={path}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
      <div
        sx={{ flex: 1, display: ["flex", "none"], justifyContent: "flex-end" }}>
        <MenuToggle icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose />
    <Main maxWidth="100%" sx={{ p: 0 }}>
      <div id="content">{props.children}</div>
    </Main>
    <Footer>
      <WidgetArea sx={{ py: "30px" }}>
        <Box height="200px" />
        <Box height="200px" />
        <Box height="200px" />
      </WidgetArea>
      Footer text
    </Footer>
  </Layout>
)
