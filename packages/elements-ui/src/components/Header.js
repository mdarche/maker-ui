import React from "react"
import { Flex, Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

export const Header = React.forwardRef((props, ref) => {
  const { header, navigation } = useOptions()

  const {
    bg = "bg_header",
    boxShadow = "header",
    maxWidth = "maxWidth_header",
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    sx,
    children,
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
      {...rest}
      sx={{
        bg,
        boxShadow,
        fontFamily: "heading",
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
