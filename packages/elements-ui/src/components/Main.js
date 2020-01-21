import React from "react"
import { Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

export const Main = React.forwardRef(
  ({ maxWidth = "maxWidth_content", ...props }, ref) => {
    const { layout } = useOptions()

    const partial = layout.includes("sidenav") ? { maxWidth, mx: "auto" } : null

    return (
      <Box
        ref={ref}
        as="main"
        id="content"
        role="main"
        tabIndex="-1"
        {...props}
        sx={{ flex: 1, ...partial }}
      />
    )
  }
)
