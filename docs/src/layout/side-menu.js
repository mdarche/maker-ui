/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import menu from "./menu"

export default () => (
  <ul sx={{ variant: "sideLink" }}>
    {menu.map(({ label, path, nested }) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
        {nested ? (
          <ul>
            {nested.map(({ label, path }) => (
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
