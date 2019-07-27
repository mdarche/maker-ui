/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { List, IconBar, Box } from "react-understudy"
import gatsbyLogoUrl from "../assets/gatsby-logo.svg"
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

const menuItems = [
  { label: "Default", path: "/" },
  { label: "Side Nav", path: "/sidenav" },
  { label: "Sidebar Left", alt: "SB Left", path: "/left-sidebar" },
  { label: "Sidebar Right", alt: "SB Right", path: "/right-sidebar" },
  { label: "Full Width", alt: "Full", path: "/full-width" },
]

// NOTE
// -- This layout looks much cleaner without override props
// -- The goal is to have simple GTE components like Default.js

// TODO Make it the override props only, nothing else

export default props => (
  <Layout>
    <Topbar backgroundColor="#663399" maxWidth="100%" color="#fff">
      <p sx={{ px: "20px", py: 1, mb: 0, fontSize: 15 }}>
        Sticky Topbar Announcement
      </p>
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
      <Main sideNav={true} paddingTop="5rem" maxWidth="52rem">
        {props.children}
      </Main>
      <SideNavToggle
        icon
        sx={{ bg: "#663399", borderRadius: "50%", bottom: 80 }}
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
              fontFamily: "body",
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
