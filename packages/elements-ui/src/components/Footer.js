import React from "react"
import { Flex, Box } from "@theme-ui/components"

export const Footer = React.forwardRef(
  ({ bg = "bg_footer", maxWidth = "maxWidth_footer", sx, ...props }, ref) => {
    return (
      <Box
        as="footer"
        ref={ref}
        id="footer"
        role="contentinfo"
        tabIndex="-1"
        sx={{
          bg,
        }}>
        <Flex
          {...props}
          sx={{
            maxWidth,
            mx: "auto",
            ...sx,
          }}
        />
      </Box>
    )
  }
)
