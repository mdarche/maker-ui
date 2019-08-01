/** @jsx jsx */
import { jsx } from "theme-ui"
import { List, IconBar } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  ContentWrapper,
  Main,
  Topbar,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"

import { ReactComponent as GatsbyLogo } from "../../assets/gatsby-logo.svg"
import { menuItems } from "../../utils/settings"

// - Your layouts will look cleaner without override props
// - See comments below

export default props => (
  <Layout>
    <Topbar backgroundColor="#663399" maxWidth="100%" color="#fff">
      <div sx={{ p: "4px 20px", fontSize: 15 }}>
        Try this page on mobile or resize your browser
      </div>
    </Topbar>

    <Header
      stickyMobile={false}
      justify="space-between"
      border="1px solid #f0f0f2"
      sx={{ px: 15 }}>
      <Logo path="/sidenav">
        <GatsbyLogo sx={{ height: 24, mr: 4 }} />
      </Logo>
      <NavMenu flex menuItems={menuItems} sx={{ a: { p: 3 } }} />
      <IconBar
        fill="#8a4baf"
        height={22}
        icons={["Search", "Github", "Twitter"]}
      />
    </Header>

    <ContentWrapper layout="sidenav-content">
      <SideNav backgroundColor="#fff" border="1px solid #f0f0f2">
        <List count={20} borderColor="#f0f0f2" padding="15px 20px 0" />
      </SideNav>
      <Main maxWidth="52rem">{props.children}</Main>
    </ContentWrapper>
    <SideNavToggle
      defaultIcon
      sx={{ bg: "#663399", borderRadius: "50%", bottom: 85 }}
    />
    <TabBar menuItems={menuItems} />
  </Layout>
)

/* Layout Tree:
  
  <Layout>

    <Topbar />

    <Header>
      <Logo />
      <NavMenu />
      <MenuToggle />
      <MobileNav/>
    </Header>

    <ContentWrapper>
      <SideNav />
      <Main>{children}</Main>
    </ContentWrapper>
    <SideNavToggle />

    <TabBar />

  </Layout> 

*/
