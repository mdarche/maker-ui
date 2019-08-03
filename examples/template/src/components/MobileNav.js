import React from "react"
import { Link } from "gatsby"

const menuItems = [
  { label: "Home", path: "/", icon: "", alt: "", split: "right" },
  { label: "About", path: "/about" },
  { label: "News", path: "/new" },
  { label: "Contact", path: "/contact" },
]

const MobileNav = () => (
  <div>
    <ul>
      {menuItems.map((label, path) => (
        <li>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default MobileNav
