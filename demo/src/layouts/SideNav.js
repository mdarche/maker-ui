/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { List, Box } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import menuItems from "../utils/menu"

export default props => (
  <Layout>
    <Header justify="space-between">
      <div id="logo">
        <Box height="45px" width="230px" mb="0" />
      </div>
      <NavMenu>
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link to={path} sx={{ p: 3, color: "#36313d" }}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
    </Header>

    <div
      id="content-wrapper"
      sx={{
        display: "flex",
      }}>
      <SideNav>
        <List count={20} border={false} padding="15px 20px 0" />
      </SideNav>
      <Main sideNav sidebar={false} paddingTop="5rem">
        <div id="content">{props.children}</div>
      </Main>
      <SideNavToggle defaultIcon sx={{ bottom: 85 }} />
    </div>

    <TabBar>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${menuItems.length}, 1fr)`,
          columnGap: 20,
        }}>
        {menuItems.map(({ label, alt, path }) => (
          <Link
            key={label}
            to={path}
            sx={{
              color: "#36313d",
              fontSize: "13px",
              textAlign: "center",
            }}>
            <Box height="30px" width="30px" mb={10} sx={{ margin: "auto" }} />
            {alt ? alt : label}
          </Link>
        ))}
      </div>
    </TabBar>
  </Layout>
)
