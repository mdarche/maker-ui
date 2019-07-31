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
import { ReactComponent as NetlifyLogo } from "../../assets/netlify-logo.svg"

// - Your layouts will look cleaner without override props
// - See comments below

export default props => (
  <Layout backgroundColor="#f2f5f7">
    <Header
      backgroundColor="#0e1e24"
      maxWidth="75rem"
      border="none"
      justify={["flex-end", "flex-start"]}
      sx={{ py: "25px", flexWrap: "wrap" }}>
      <div
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Logo>
          <NetlifyLogo sx={{ height: "36px" }} />
        </Logo>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <IconBar icons={["Notification"]} fill="#717e82" />
          <MenuToggle icon="menu" fill="#fff" />
        </div>
      </div>
      <NavMenu
        flex
        menuItems={menuItems}
        sx={{
          mt: "15px",
          pt: "15px",
          width: "100%",
          borderTop: "2px solid #212f35",
          a: {
            p: "8px 15px",
            color: "#717e82",
            display: "flex",
            fontWeight: "bold",
          },
        }}
      />
      <MobileNav backgroundColor="#fff" animation="slideLeft" />
    </Header>
    <ContentWrapper maxWidth="100%" sx={{ px: 0 }}>
      <Main>{props.children}</Main>
    </ContentWrapper>

    <Footer backgroundColor="#0e1e24" maxWidth="75rem" border="none">
      <ul sx={{ display: "flex" }}>
        {menuItems.map(({ label, path }) => (
          <li key={label} sx={{ p: "10px" }}>
            <Link
              sx={{
                color: "#717e82",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: 1,
              }}
              to={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div sx={{ p: "10px", fontSize: 1, color: "#717e82" }}>
        Copyright 2019
      </div>
    </Footer>
  </Layout>
)

/* Layout Tree:
  
  <Layout>

    <Header>
      <Logo />
      <MenuToggle />
      <NavMenu />
      <MobileNav/>
    </Header>

    <ContentWrapper>     
      <Main>{children}</Main>
    </ContentWrapper>

    <Footer />

  </Layout> 

*/
