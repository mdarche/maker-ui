import React from "react"
import { Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

const Main = React.forwardRef(
  ({ maxWidth = "maxWidth_content", ...props }, ref) => {
    const { layout } = useOptions()

    const partial = layout.includes("sidenav") ? { maxWidth, mx: "auto" } : null
    console.log("rerendering")
    return (
      <Box
        ref={ref}
        as="main"
        id="content"
        {...props}
        sx={{ flex: 1, ...partial }}
      />
    )
  }
)

export default Main
