import React from "react"
import { ElementsTemplate } from "gatsby-theme-elements"

import FooterWidgets from "../components/FooterWidgets"
import MobileNav from "../components/MobileNav"
import Topbar from "../components/Topbar"
import Footer from "../components/Footer"

const menuItems = [
  { label: "Home", path: "/", icon: "", alt: "", split: "left" },
  { label: "About", path: "/about", icon: "", alt: "", split: "left" },
  { label: "News", path: "/news", icon: "", alt: "", split: "right" },
  { label: "Contact", path: "/contact", icon: "", alt: "", split: "right" },
]

// No need to add semantic HTML to your custom components. Divs and fragments!

export default ({ children }) => (
  <ElementsTemplate
    menuItems={menuItems}
    topbar={<Topbar />}
    mobileNav={<MobileNav />}
    footerWidgets={<FooterWidgets />}
    footer={<Footer />}>
    {children}
  </ElementsTemplate>
)
