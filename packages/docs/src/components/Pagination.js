/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import links from "../utils/menu"
import _ from "lodash"

const flatMenu = _.flatten(
  links.map(item => (item.children ? item.children.map(i => i) : item))
)

flatMenu.splice(4, 0, links[4])

export default ({ location }) => {
  const current = flatMenu.findIndex(
    ({ path }) => path === location.replace(/\/$/, "")
  )

  const button = type => {
    const index = current === -1 ? 0 : current
    return flatMenu[index + type] !== undefined ? (
      <Link
        to={flatMenu[index + type].path}
        sx={{ variant: "buttons.pagination" }}>
        <div>{type === 1 ? "Next" : "Prev"}:</div>
        <div className="label">{flatMenu[index + type].label}</div>
      </Link>
    ) : null
  }

  return (
    <div
      id="pagination"
      sx={{
        mt: ["50px", "130px"],
        pt: 50,
        borderTop: "1px solid",
        borderColor: "border",
        display: "flex",
        alignItems: "center",
        justifyContent: ["flex-start", "space-between"],
      }}>
      {current !== 0 ? button(-1) : null}
      {current !== flatMenu.length - 1 ? button(1) : null}
    </div>
  )
}
