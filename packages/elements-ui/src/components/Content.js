import React from "react"
import { Box } from "@theme-ui/components"

import { useLayout } from "../context/ElementsContext"

export const Content = React.forwardRef(
  ({ layout, maxWidth, gridGap, sx, ...props }, ref) => {
    const [baseLayout, setLayout] = useLayout()

    if (layout !== undefined && layout !== baseLayout) {
      setLayout(layout)
    }

    return (
      <Box
        ref={ref}
        variant={`layout.eui_${layout || baseLayout}`}
        {...props}
        sx={{
          mx: "auto",
          p: ["20px", 0],
          ...sx,
        }}
      />
    )
  }
)
