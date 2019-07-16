/** @jsx jsx */
import { jsx } from "theme-ui"
import { useOptions } from "../context/UIContext"
import { styleUnit } from "../utils/helper"

const Main = props => {
  const options = useOptions().content
  const { sbWidth, sbPosition, maxWidth, sidebar, columnGap } = props
  const columns = props.children.length
  const sidebarActive = sidebar || options.sidebar ? true : false

  // Handle extra child components
  if (columns !== 2 && sidebarActive) {
    throw new Error(
      "The <Main /> component accepts two (2) child components when the Sidebar is active."
    )
  }

  const sideBarPartial = () => {
    if (sidebarActive) {
      const width = styleUnit(sbWidth) || styleUnit(options.sbWidth)
      const position = sbPosition || options.sbPosition

      return position === "right"
        ? {
            gridTemplateColumns: [`1fr`, `1fr ${width}`],
          }
        : {
            gridTemplateColumns: [`1fr`, `${width} 1fr`],
            "> :first-of-type": {
              gridRow: [2, 1],
            },
          }
    }
    return { gridTemplateColumns: "1fr" }
  }

  return (
    <main
      sx={{
        m: ["initial", "0 auto"],
        p: styleUnit(options.padding),
        width: ["auto", "100%"],
        maxWidth: maxWidth || "max_content",
        display: sidebarActive && columns !== 1 ? "grid" : "block",
        gridColumnGap: columnGap || options.columnGap,
        gridRowGap: 30,
        ...sideBarPartial(),
      }}
      {...props}
    />
  )
}

export default Main
