/** @jsx jsx */
import { jsx } from "theme-ui"
import { getOptions } from "../context/UIContext"
import { styleString } from "../utils/helper"

const Main = props => {
  const options = getOptions().content
  const { sbWidth, sbPosition, maxWidth, sideBar, columnGap } = props

  // Handle extra child components
  if (props.children.length !== 2 && options.sideBar) {
    throw new Error(
      "The <Main /> component accepts two (2) child components when the Sidebar is active."
    )
  }

  const sideBarPartial = () => {
    if (sideBar || options.sideBar) {
      const width = styleString(sbWidth) || styleString(options.sbWidth)
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
        p: styleString(options.padding),
        width: ["auto", "100%"],
        maxWidth: maxWidth || "contentWidth",
        display: "grid",
        gridColumnGap: columnGap || options.columnGap,
        ...sideBarPartial(),
      }}
      {...props}
    />
  )
}

export default Main
