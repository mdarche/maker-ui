/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Box, IconBar } from "react-understudy"
import {
  Layout,
  Header,
  NavMenu,
  Main,
  Footer,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"
import menuItems from "../../utils/menu"

// NOTE
// Your layouts will look cleaner without override props and placeholders
// You can set all of these defaults in your shadowed config files

export default props => (
  <Layout>
    <Header sticky={false} backgroundColor="#24292e" sx={{ p: "10px 0" }}>
      <div id="logo">
        <IconBar icons={["Github"]} fill="#fff" height="42px" />
      </div>
      <Box
        background="#3f4448"
        height="25px"
        mb="0"
        sx={{
          color: "rgba(255, 255, 255, 0.45)",
          p: "5px 10px",
          fontSize: "15px",
          width: ["50% !important", "280px !important"],
        }}>
        Search or jump to...
      </Box>
      <div
        sx={{
          flex: 1,
          display: "flex",
          p: "0 10px 0 25px",
          justifyContent: ["flex-end", "space-between"],
        }}>
        <NavMenu>
          {menuItems.map(({ label, path }) => (
            <li key={label}>
              <Link
                sx={{
                  p: 2,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                to={path}>
                {label}
              </Link>
            </li>
          ))}
        </NavMenu>
        <div sx={{ display: ["none", "flex"] }}>
          <IconBar icons={["Notification", "Add"]} fill="#fff" />
        </div>
        <MenuToggle fill="#fff" icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose animation="slideLeft" />
    <Main sidebarWidth="25%" maxWidth="1280px" sx={{ pt: "24px" }}>
      {/* Here we handle both the sidebar and content at the page level. See src/pages/github.js  */}
      {props.children}
    </Main>
    <Footer border="none" maxWidth="1012px">
      <div
        sx={{
          borderTop: "1px solid #eaecef",
          py: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box height="25px" mb="0" />
        <IconBar
          icons={["Github"]}
          fill="#d2d2d2"
          height="35px"
          sx={{ px: 4 }}
        />
        <Box height="25px" mb="0" />
      </div>
    </Footer>
  </Layout>
)
