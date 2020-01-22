import React from "react"
import { Box } from "@theme-ui/components"

import { useLayout } from "../context/ElementsContext"

// TODO - Figure out padding top vs Main and mobile padding

export const Content = React.forwardRef(
  ({ layout, maxWidth, gridGap, sx, ...props }, ref) => {
    const [baseLayout, setLayout] = useLayout()

    if (layout !== undefined && layout !== baseLayout) {
      setLayout(layout)
    }

    return (
      <Box
        ref={ref}
        variant={`eui_layout.${layout || baseLayout}`}
        {...props}
        sx={{
          mx: "auto",
          ...sx,
        }}
      />
    )
  }
)
