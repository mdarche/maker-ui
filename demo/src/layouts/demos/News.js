/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { IconBar } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  ContentWrapper,
  Main,
  Footer,
  MenuToggle,
  MobileNav,
  Topbar,
} from "gatsby-theme-elements"

import { menuItems } from "../../utils/settings"
import { ReactComponent as NewsLogo } from "../../assets/news-logo.svg"

// - Your layouts will look cleaner without override props
// - See comments below

export default props => (
  <Layout>
    <Topbar
      backgroundColor="#f8f8f8"
      border="1px solid #efecec"
      sx={{ display: "flex", justifyContent: "flex-end" }}>
      <IconBar
        icons={["Facebook", "Twitter", "Github", "LinkedIn", "Envelope"]}
        fill="#333"
        height="20px"
      />
    </Topbar>
    <Header justify="space-between">
      <Logo>
        <NewsLogo sx={{ height: "20px" }} />
      </Logo>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <NavMenu
          flex
          justify="flex-end"
          menuItems={menuItems}
          sx={{
            borderRight: "1px solid #000",
            mr: "10px",
            a: { fontSize: 1, p: 3 },
          }}
        />
        <IconBar icons={["Search"]} height="15px" />
        <MenuToggle icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose />
    <ContentWrapper maxWidth="100%" sx={{ px: 0 }}>
      <Main>{props.children}</Main>
    </ContentWrapper>
    <Footer backgroundColor="#f8f8f8">
      <ul sx={{ display: "flex", justifyContent: "center" }}>
        {menuItems.map(({ label, path }) => (
          <li key={label} sx={{ p: "10px" }}>
            <Link
              sx={{
                textDecoration: "none",
                fontSize: 1,
              }}
              to={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </Footer>
  </Layout>
)

/* Layout Tree:
  
  <Layout>
    
    <Topbar />

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
