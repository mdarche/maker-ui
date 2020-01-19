import React from "react"
import { Flex, Box } from "@theme-ui/components"

const Header = React.forwardRef(
  (
    { bg, boxShadow, borderBottom, borderColor, stickyHeader, sx, ...props },
    ref
  ) => {
    return (
      <Box
        as="header"
        ref={ref}
        sx={{
          bg,
          boxShadow,
          borderBottom,
          borderColor,
          fontFamily: "heading",
          zIndex: 100,
          ...stickyHeader,
        }}>
        <Flex
          {...props}
          sx={{
            alignItems: "center",
            position: "relative",
            mx: "auto",
            ...sx,
          }}
        />
      </Box>
    )
  }
)

export default Header
