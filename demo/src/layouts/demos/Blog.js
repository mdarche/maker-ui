/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { IconBar } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  Main,
  ContentWrapper,
  Footer,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

import { menuItems } from "../../utils/settings"
import { ReactComponent as BlogLogo } from "../../assets/blog-logo.svg"

// - Your layouts will look cleaner without override props
// - See comments below

export default props => (
  <Layout>
    <Header
      border="1px solid #c800ec"
      justify={["flex-end", "flex-start"]}
      sx={{ p: 0 }}>
      <Logo>
        <BlogLogo
          sx={{ height: 65, position: "absolute", top: "-12px", left: "-7px" }}
        />
      </Logo>
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
    <ContentWrapper maxWidth={650}>
      <Main sx={{ pt: 6 }}>{props.children}</Main>
    </ContentWrapper>

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
      <div sx={{ order: 1 }}>Copyright 2019</div>
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

    <ContentWrapper>     
      <Main>{children}</Main>
    </ContentWrapper>

    <Footer />

  </Layout> 

*/
