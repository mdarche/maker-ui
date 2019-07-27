/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"

const Main = props => {
  const options = useOptions()
  const columns = Array.isArray(props.children) ? props.children.length : 1
  const {
    sidebar = options.main.sidebar,
    sidebarWidth = formatUnit(options.main.sidebarWidth),
    sidebarPosition = options.main.sidebarPosition,
    sideNav = options.sideNav.active,
    maxWidth,
    gridGap,
    paddingTop,
    ...rest
  } = props

  // Handle Errors

  if (columns > 2) {
    throw new Error(
      "The Main component accepts a maximum of 2 child components (sidebar and content area). Be sure to specify whether the sidebar is on the left or right so Main can properly format the grid."
    )
  }

  // Partials

  const sidebarPartial = () => {
    if (sidebar) {
      const gap = gridGap ? { gridGap } : { variant: "gaps.mainGap" }
      const gridLayout =
        sidebarPosition === "right"
          ? {
              gridTemplateColumns: [`1fr`, `1fr ${sidebarWidth}`],
            }
          : {
              gridTemplateColumns: [`1fr`, `${sidebarWidth} 1fr`],
              "> :first-of-type": {
                gridRow: [2, 1],
              },
            }

      return { ...gap, ...gridLayout }
    }
  }

  const sideNavPartial = sideNav
    ? { pl: [0, options.sideNav.width] }
    : { maxWidth: maxWidth || "max_main" }

  return (
    <main
      sx={{
        m: ["initial", "0 auto"],
        width: ["auto", "100%"],
        flex: 1,
        ...sideNavPartial,
      }}>
      <div
        sx={{
          maxWidth: sideNav ? maxWidth || "max_main" : "inherit",
          m: sideNav ? "0 auto" : "auto",
          pt: paddingTop || options.main.paddingTop,
          px: 20,
          display: sidebar && columns !== 1 ? "grid" : "block",
          ...sidebarPartial(),
        }}
        {...rest}
      />
    </main>
  )
}

Main.propTypes = {
  gridGap: PropTypes.number,
  sideNav: PropTypes.bool,
  sidebar: PropTypes.bool,
  sidebarPosition: PropTypes.string,
  sidebarWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default Main
