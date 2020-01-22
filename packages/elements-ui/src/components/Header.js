import React from "react"
import { Flex, Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

export const Header = React.forwardRef((props, ref) => {
  const { header, navigation } = useOptions()

  const {
    bg = "bg_header",
    maxWidth = "maxWidth_header",
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    sx,
    children,
    variant = "header",
    ...rest
  } = props

  const partial = sticky
    ? {
        position: stickyMobile ? "sticky" : ["initial", "sticky"],
      }
    : null

  return (
    <Box
      as="header"
      ref={ref}
      id="site-header"
      role="banner"
      tabIndex="-1"
      variant={variant}
      bg={bg}
      {...rest}
      sx={{
        zIndex: 100,
        ...partial,
        ...sx,
      }}>
      <Flex variant={`eui_header.${navigation}`} sx={{ maxWidth, m: "0 auto" }}>
        {children}
      </Flex>
    </Box>
  )
})
