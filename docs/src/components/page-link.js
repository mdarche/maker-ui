/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export default ({ path, label, home = false, ...props }) => (
  <div
    {...props}
    sx={{ mt: home ? 4 : 5, textAlign: !home ? "right" : "left" }}>
    <Link to={path} sx={{ variant: "buttons.pagination" }}>
      {!home ? <div>Next:</div> : null}
      <div sx={{ fontWeight: 700 }}>{label}</div>
    </Link>
  </div>
)
