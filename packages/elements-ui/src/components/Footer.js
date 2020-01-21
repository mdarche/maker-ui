import React from "react"
import { Flex, Box } from "@theme-ui/components"

const Footer = React.forwardRef(
  (
    {
      bg = "bg_footer",
      borderTop = "1px solid",
      borderColor = "border",
      maxWidth = "maxWidth_footer",
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        as="footer"
        ref={ref}
        bg={bg}
        sx={{
          borderTop,
          borderColor,
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

export default Footer
