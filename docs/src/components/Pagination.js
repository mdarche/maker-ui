/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import menu from "../utils/menu"
import _ from "lodash"

const flatMenu = _.flatten(
  menu.map(item => (item.nested ? item.nested.map(i => i) : item))
)

flatMenu.splice(4, 0, menu[4])

export default ({ location }) => {
  const current = flatMenu.findIndex(({ path }) => path === location)

  const button = type =>
    flatMenu[current + type] !== undefined ? (
      <Link
        to={flatMenu[current + type].path}
        sx={{ variant: "buttons.pagination" }}>
        <div>{type === 1 ? "Next" : "Prev"}:</div>
        <div className="label">{flatMenu[current + type].label}</div>
      </Link>
    ) : null

  return (
    <div
      id="pagination"
      sx={{
        mt: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      {current !== 0 ? button(-1) : null}
      {current !== flatMenu.length - 1 ? button(1) : null}
    </div>
  )
}
