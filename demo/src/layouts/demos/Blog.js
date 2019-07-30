/** @jsx jsx */
import { jsx } from "theme-ui"
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

//
// -- Your layouts will look cleaner without override props and placeholders
// -- See the layout tree at the bottom of this file
//

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
      <NavMenu
        flex
        menuItems={menuItems}
        sx={{
          pl: "80px",
          a: {
            p: "8px 20px",
            fontWeight: "bold",
            textTransform: "uppercase",
            display: "flex",
          },
        }}
      />
      <IconBar icons={["Search"]} height="21px" />
      <MenuToggle icon="menu" />
      <MobileNav defaultClose backgroundColor="#c800ec" animation="slideLeft" />
    </Header>
    <Main maxWidth={650} sidebar={false}>
      <div id="content">{props.children}</div>
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

/* Layout Tree:
  
  <Layout>

    <Header>
      <Logo />
      <NavMenu />
      <MenuToggle />
      <MobileNav/>
    </Header>

    <Main>{children}</Main>

    <Footer />

  </Layout> 

*/
