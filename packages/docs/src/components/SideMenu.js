/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import menu from "../utils/menu"

export default () => (
  <ul sx={{ variant: "sideLink" }}>
    {menu.map(({ label, path, children }) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
        {children ? (
          <ul>
            {children.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    ))}
  </ul>
)
