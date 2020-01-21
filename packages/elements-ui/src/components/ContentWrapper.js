import React from "react"
import { Box } from "@theme-ui/components"

import { useLayout, useOptions } from "../context/ElementsContext"

const ContentWrapper = React.forwardRef(
  ({ layout, maxWidth, gridGap, mobileReverse, sx, ...props }, ref) => {
    const [optionsLayout, setLayout] = useLayout()
    // const { sidebar } = useOptions()

    if (layout !== undefined && layout !== optionsLayout) {
      setLayout(layout)
    }

    // const partial = () => {
    //   console.log(layout)
    //   if (layout === "content-sidebar") {
    //     return { gridTemplateColumns: [`1fr`, `${sidebar.width} 1fr`] }
    //   }
    //   if (layout == "sidebar-content") {
    //     return {
    //       gridTemplateColumns: [`1fr`, `1fr ${sidebar.width}`],
    //     }
    //   }
    //   return null
    // }

    // console.log(partial())

    return (
      <Box
        ref={ref}
        variant={`layout.${layout || optionsLayout}`}
        id="content-wrapper"
        {...props}
        sx={{
          mx: "auto",
          p: ["20px", 0],
          // variant: `layout.${layout || optionsLayout}`,
          // gridTemplateColumns: ["1fr", "1fr 1fr"],
          // ...partial(),
          ...sx,
        }}
      />
    )
  }
)

export default ContentWrapper
