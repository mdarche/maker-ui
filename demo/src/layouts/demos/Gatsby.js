/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { List, IconBar, Box } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Topbar,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import gatsbyLogoUrl from "../../assets/gatsby-logo.svg"
import menuItems from "../../utils/menu"

// NOTE
// Your layouts will look cleaner without override props
// You can set all of these defaults in your shadowed config files

export default props => (
  <Layout>
    <Topbar backgroundColor="#663399" maxWidth="100%" color="#fff">
      <div sx={{ p: "4px 20px", fontSize: 15 }}>
        Try this page on mobile or resize your browser
      </div>
    </Topbar>

    <Header stickyMobile={false} border="1px solid #f0f0f2" sx={{ px: 15 }}>
      <Link id="logo" to="/sidenav">
        <img sx={{ height: 24, mr: 4 }} src={gatsbyLogoUrl} alt="Gatsby Logo" />
      </Link>
      <NavMenu flex>
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link to={path} sx={{ p: 3, color: "#36313d" }}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
      <IconBar
        fill="#8a4baf"
        height={22}
        icons={["Search", "Github", "Twitter"]}
      />
    </Header>

    <div
      sx={{
        display: "flex",
      }}>
      <SideNav border="1px solid #f0f0f2" sx={{ pt: 3 }}>
        <List count={20} borderColor="#f0f0f2" padding="15px 20px 0" />
      </SideNav>
      <Main sideNav paddingTop="5rem" maxWidth="52rem">
        {props.children}
      </Main>
      <SideNavToggle
        defaultIcon
        sx={{ bg: "#663399", borderRadius: "50%", bottom: 85 }}
      />
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
