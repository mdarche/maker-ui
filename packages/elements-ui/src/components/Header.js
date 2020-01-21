import React from "react"
import { Flex, Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

export const Header = React.forwardRef((props, ref) => {
  const { header } = useOptions()

  const {
    bg = "bg_header",
    boxShadow = "header",
    borderBottom,
    borderColor = "border",
    justifyContent = "flex-start",
    maxWidth = "maxWidth_header",
    sticky = header.sticky,
    stickyMobile = header.stickyMobile,
    sx,
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
      sx={{
        bg,
        boxShadow,
        borderBottom,
        borderColor,
        fontFamily: "heading",
        zIndex: 100,
        ...partial,
      }}>
      <Flex
        {...rest}
        sx={{
          position: "relative",
          alignItems: "center",
          justifyContent,
          maxWidth,
          mx: "auto",
          ...sx,
        }}
      />
    </Box>
  )
})
