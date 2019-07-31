/** @jsx jsx */
import { jsx } from "theme-ui"
import { List, IconBar, Box } from "react-understudy"
import { Link } from "gatsby"
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
import gatsbyLogoUrl from "../../assets/gatsby-logo.svg"
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

    <Header stickyMobile={false} border="1px solid #f0f0f2" sx={{ px: 15 }}>
      <Logo path="/sidenav">
        <img sx={{ height: 24, mr: 4 }} src={gatsbyLogoUrl} alt="Gatsby Logo" />
      </Logo>
      <NavMenu flex menuItems={menuItems} sx={{ a: { p: 3 } }} />
      <IconBar
        fill="#8a4baf"
        height={22}
        icons={["Search", "Github", "Twitter"]}
      />
    </Header>

    <ContentWrapper>
      <SideNav border="1px solid #f0f0f2">
        <List count={20} borderColor="#f0f0f2" padding="15px 20px 0" />
      </SideNav>
      <Main maxWidth="52rem" sx={{ pt: "5rem" }}>
        {props.children}
      </Main>
    </ContentWrapper>
    <SideNavToggle
      defaultIcon
      sx={{ bg: "#663399", borderRadius: "50%", bottom: 85 }}
    />
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

{
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
}
