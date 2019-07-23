/** @jsx jsx */
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { formatUnit } from "../utils/helper"

const Main = props => {
  const {
    sidebar,
    sidebarWidth,
    sidebarPosition,
    maxWidth,
    sideNav,
    columnGap,
    paddingTop,
    children,
    style,
  } = props
  const options = useOptions().content
  const sideNavOptions = useOptions().sideNav
  const columns = Array.isArray(children) ? children.length : 1
  const sidebarActive = sidebar || options.sidebar
  const sideNavActive = sideNav || sideNavOptions.active

  // Handle Errors

  if (columns > 2) {
    throw new Error(
      "The Main component accepts a maximum of 2 child components (sidebar and content areas). Be sure to specify whether the sidebar is on the left or right."
    )
  }

  // Partials
  // TODO - Refactor this partial

  const sidebarPartial = () => {
    if (sidebarActive) {
      const width = formatUnit(sidebarWidth) || formatUnit(options.sidebarWidth)
      const position = sidebarPosition || options.sidebarPosition

      return position === "right"
        ? {
            gridTemplateColumns: [`1fr`, `1fr ${width}`],
            gridGap: columnGap || "contentGap",
          }
        : {
            gridTemplateColumns: [`1fr`, `${width} 1fr`],
            gridGap: columnGap || "contentGap",

            "> :first-of-type": {
              gridRow: [2, 1],
            },
          }
    }
  }

  // TODO update this MQ to reflect sidenav breakpoint setting
  const sideNavPartial = () => {
    return sideNavActive ? { pl: [0, sideNavOptions.width] } : null
  }

  return (
    <main
      sx={{
        m: ["initial", "0 auto"],
        pt: paddingTop || options.paddingTop,
        width: ["auto", "100%"],
        maxWidth: maxWidth || "max_content",
        flex: 1,
        ...sideNavPartial(),
      }}
    >
      <div
        sx={{
          px: 20,
          display: sidebarActive && columns !== 1 ? "grid" : "block",
          ...sidebarPartial(),
          ...style,
        }}
      >
        {children}
      </div>
    </main>
  )
}

export default Main
