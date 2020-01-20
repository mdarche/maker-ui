import React from "react"
import { Box } from "@theme-ui/components"

import { useLayout } from "../context/ElementsContext"

const ContentWrapper = React.forwardRef(
  ({ layout, maxWidth, gridGap, mobileReverse, sx, ...props }, ref) => {
    const [optionsLayout, setLayout] = useLayout()

    console.log(optionsLayout)

    if (layout !== undefined && layout !== optionsLayout) {
      setLayout(layout)
    }

    return (
      <Box
        {...props}
        id="content-wrapper"
        ref={ref}
        variant={`layout.${layout || optionsLayout}`}
        sx={{
          mx: "auto",
          ...sx,
        }}
      />
    )
  }
)

export default ContentWrapper
