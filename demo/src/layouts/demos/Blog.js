/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { IconBar } from "react-understudy"
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
import blogLogoUrl from "../../assets/blog-logo.svg"

// NOTE
// Your layouts will look cleaner without override props and placeholders
// You can set all of these defaults in your shadowed config files

export default props => (
  <Layout>
    <Header
      border="1px solid #c800ec"
      justify={["flex-end", "flex-start"]}
      sx={{ p: 0 }}>
      <div id="logo">
        <img
          sx={{ height: 65, position: "absolute", top: "-12px", left: "-7px" }}
          src={blogLogoUrl}
          alt="Lengstorf Blog Logo"
        />
      </div>
      <NavMenu flex sx={{ pl: "80px" }}>
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link
              sx={{
                p: "8px 20px",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: "flex",
              }}
              to={path}>
              {label}
            </Link>
          </li>
        ))}
      </NavMenu>
      <IconBar icons={["Search"]} height="21px" />
      <MenuToggle icon="menu" />
    </Header>
    <MobileNav defaultClose backgroundColor="#c800ec" animation="slideLeft" />
    <Main maxWidth={650}>
      <div>{props.children}</div>
    </Main>
    <Footer
      maxWidth={650}
      border="none"
      sx={{
        display: ["block", "flex"],
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.9rem",
        textAlign: ["center", "left"],
      }}>
      <div sx={{ order: 2 }}>
        <ul sx={{ display: "flex" }}>
          {menuItems.map(({ label, path }) => (
            <li key={label} sx={{ p: "10px" }}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div sx={{ order: 1 }}>Copyright</div>
    </Footer>
  </Layout>
)
