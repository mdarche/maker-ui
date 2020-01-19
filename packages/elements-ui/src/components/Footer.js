import React from "react"
import { Flex, Box } from "@theme-ui/components"

const Footer = React.forwardRef(
  ({ bg, borderTop, borderColor, sx, ...props }, ref) => {
    return (
      <Box
        as="footer"
        ref={ref}
        sx={{
          bg,
          borderTop,
          borderColor,
        }}>
        <Flex
          {...props}
          sx={{
            mx: "auto",
            ...sx,
          }}
        />
      </Box>
    )
  }
)

export default Footer
