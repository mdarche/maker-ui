/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export default ({ path, label, next = false }) => (
  <Link to={path} sx={{ variant: "buttons.pagination" }}>
    {next ? <div>Next:</div> : null}
    <div sx={{ fontWeight: 700 }}>{label}</div>
  </Link>
)
