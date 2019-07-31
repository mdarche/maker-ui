/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { List, Box } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  ColorToggle,
  NavMenu,
  ContentWrapper,
  Main,
  TabBar,
  SideNav,
  SideNavToggle,
} from "gatsby-theme-elements"
import { menuItems, logoColors } from "../utils/settings"

export default props => (
  <Layout>
    <Header justify="space-between">
      <Logo colorOptions={logoColors} />
      <NavMenu
        flex
        justify="flex-end"
        menuItems={menuItems}
        sx={{ a: { p: 3 } }}
      />
      <ColorToggle />
    </Header>
    <ContentWrapper>
      <SideNav>
        <List count={20} border={false} padding="15px 20px 0" />
      </SideNav>
      <Main maxWidth="750px" sx={{ pt: 5 }}>
        {props.children}
      </Main>
    </ContentWrapper>
    <SideNavToggle defaultIcon sx={{ bottom: 85 }} />

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
