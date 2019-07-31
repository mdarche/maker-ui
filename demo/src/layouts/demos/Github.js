/** @jsx jsx */
import { jsx } from "theme-ui"
import { IconBar, Box } from "react-understudy"
import {
  Layout,
  Header,
  Logo,
  ContentWrapper,
  NavMenu,
  Footer,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

import { menuItems } from "../../utils/settings"

// - Your layouts will look cleaner without override props
// - See comments below

export default props => (
  <Layout>
    <Header sticky={false} backgroundColor="#24292e" sx={{ p: "10px 0" }}>
      <Logo>
        <IconBar icons={["Github"]} fill="#fff" height="42px" />
      </Logo>
      <div
        sx={{
          bg: "#3f4448",
          height: "25px",
          color: "rgba(255, 255, 255, 0.45)",
          p: "5px 10px",
          fontSize: "15px",
          width: ["50%", "280px"],
        }}>
        Search or jump to...
      </div>
      <div
        sx={{
          flex: 1,
          display: "flex",
          p: "0 10px 0 25px",
          justifyContent: ["flex-end", "space-between"],
        }}>
        <NavMenu
          menuItems={menuItems}
          sx={{
            a: {
              px: "15px",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
            },
          }}
        />
        <div sx={{ display: ["none", "flex"] }}>
          <IconBar icons={["Notification", "Add"]} fill="#fff" />
        </div>
        <MenuToggle fill="#fff" icon="menu" />
      </div>
    </Header>
    <MobileNav defaultClose animation="slideLeft" />
    <ContentWrapper
      layout="sidebar-content"
      mobileReverse={false}
      maxWidth="1280px"
      sx={{ pt: 5 }}>
      {props.children}
    </ContentWrapper>
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

/* Layout Tree:
  
  <Layout>

    <Header>
      <Logo />
      <NavMenu />
      <MenuToggle />
      <MobileNav/>
    </Header>

    <ContentWrapper>{children}</ContentWrapper>

    <Footer />

  </Layout> 

*/
