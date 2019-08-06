/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const links = [
  { label: "Getting Started", path: "" },
  { label: "Installation", path: "" },
  { label: "Theme.js", path: "" },
  { label: "Options.js", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
]

export default () => (
  <ul>
    {links.map(({ label, path }) => (
      <li>
        <Link />
      </li>
    ))}
  </ul>
)
