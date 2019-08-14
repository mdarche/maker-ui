/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import menu from "../layout/menu"

const flatMenu = menu
  .map(item => (item.nested ? item.nested.map(i => i) : item))
  .flat()

flatMenu.splice(4, 0, menu[4])

export default ({ location }) => {
  const current = flatMenu.findIndex(({ path }) => path === location)

  const button = type => (
    <Link
      to={flatMenu[current + type].path}
      sx={{ variant: "buttons.pagination" }}>
      <div>{type === 1 ? "Next" : "Prev"}:</div>
      <div className="label">{flatMenu[current + type].label}</div>
    </Link>
  )

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
