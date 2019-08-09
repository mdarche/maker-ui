/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  NavMenu,
  ContentWrapper,
  Main,
  Footer,
  MenuToggle,
  ColorToggle,
  MobileNav,
  FooterWidgets,
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
      <div sx={{ display: "flex" }}>
        <ColorToggle />
        <MenuToggle icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose />
    <ContentWrapper sx={{ pt: 5 }}>
      <Main>{props.children}</Main>
    </ContentWrapper>
    <Footer>
      <FooterWidgets sx={{ pt: "30px" }}>
        <Box height="200px" />
        <Box height="200px" />
        <Box height="200px" />
      </FooterWidgets>
    </Footer>
  </Layout>
)
