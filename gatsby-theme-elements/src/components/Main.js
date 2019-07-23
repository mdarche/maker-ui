/** @jsx jsx */
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"

// TODO - Add prop types to all exportable components

const Main = props => {
  const {
    sidebar,
    sidebarWidth,
    sidebarPosition,
    maxWidth,
    sideNav,
    gridGap,
    paddingTop,
    children,
    ...rest
  } = props
  const options = useOptions()
  const columns = Array.isArray(children) ? children.length : 1
  const sidebarActive = sidebar || options.main.sidebar
  const sideNavActive = sideNav || options.sideNav.active
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

  const sideNavPartial = () => {
    return sideNavActive ? { pl: [0, options.sideNav.width] } : null
  }

  return (
    <main
      sx={{
        m: ["initial", "0 auto"],
        width: ["auto", "100%"],
        maxWidth: maxWidth || "max_content",
        flex: 1,
        ...sideNavPartial(),
      }}
    >
      <div
        {...rest}
        sx={{
          pt: paddingTop || options.main.paddingTop,
          px: 20,
          display: sidebarActive && columns !== 1 ? "grid" : "block",
          ...sidebarPartial(),
        }}
      >
        {children}
      </div>
    </main>
  )
}

export default Main
