import React from "react"
import { ElementsTemplate } from "gatsby-theme-elements"

import FooterWidgets from "../components/FooterWidgets"
import MobileNav from "../components/MobileNav"
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

const menuItems = [
  { label: "Home", path: "/", icon: "", alt: "", split: "right" },
  { label: "About", path: "/about" },
  { label: "News", path: "/new" },
  { label: "Contact", path: "/contact" },
]

// No need to add semantic HTML to your custom components. Divs and fragments!

export default ({ children }) => (
  <ElementsTemplate
    menuItems={menuItems}
    topbar={<Topbar />}
    mobileNav={<MobileNav />}
    footerWidgets={<FooterWidgets />}
    footer={<Footer />}
    options={{
      navPosition: "right",
      logoHeight: "200px",
      headerPadding: 3,
      navLinkPadding: 3,
      navLinkFontSize: 2,
      mobileCloseIcon: true,
      colorToggle: true,
      sideBarPosition: "right",
      sideNavPosition: "left",
      tabBar: false,
    }}>
    {children}
  </ElementsTemplate>
)
