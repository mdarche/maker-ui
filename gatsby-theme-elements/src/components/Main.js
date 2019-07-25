/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"

const Main = props => {
  const options = useOptions()
  const columns = Array.isArray(props.children) ? props.children.length : 1
  const {
    sidebar,
    sidebarWidth,
    sidebarPosition,
    maxWidth,
    sideNav,
    gridGap,
    paddingTop,
    ...rest
  } = props

  const sidebarActive = sidebar !== undefined ? sidebar : options.main.sidebar
  const sideNavActive = sideNav !== undefined ? sideNav : options.sideNav.active
  const width =
    formatUnit(sidebarWidth) || formatUnit(options.main.sidebarWidth)
  const position = sidebarPosition || options.main.sidebarPosition

  // Handle Errors

  if (columns > 2) {
    throw new Error(
      "The Main component accepts a maximum of 2 child components (sidebar and content area). Be sure to specify whether the sidebar is on the left or right so Main can properly format the grid."
    )
  }

  // Partials

  const sidebarPartial = () => {
    if (sidebarActive) {
      const gap = gridGap ? { gridGap } : { variant: "gaps.mainGap" }
      const gridLayout =
        position === "right"
          ? {
              gridTemplateColumns: [`1fr`, `1fr ${width}`],
            }
          : {
              gridTemplateColumns: [`1fr`, `${width} 1fr`],
              "> :first-of-type": {
                gridRow: [2, 1],
              },
            }

      return { ...gap, ...gridLayout }
    }
  }

  const sideNavPartial = sideNavActive
    ? { pl: [0, options.sideNav.width] }
    : null

  return (
    <main
      sx={{
        m: ["initial", "0 auto"],
        width: ["auto", "100%"],
        maxWidth: maxWidth || "max_main",
        flex: 1,
        ...sideNavPartial,
      }}
    >
      <div
        sx={{
          pt: paddingTop || options.main.paddingTop,
          px: 20,
          display: sidebarActive && columns !== 1 ? "grid" : "block",
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
