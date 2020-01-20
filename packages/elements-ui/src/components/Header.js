import React from "react"
import { Flex, Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

const Header = React.forwardRef((props, ref) => {
  const options = useOptions()

  const {
    bg = "bg_header",
    maxWidth = "mw_header",
    boxShadow = "header",
    borderBottom,
    borderColor,
    justifyContent = "flex-start",
    sticky = options.header.sticky,
    stickyMobile = options.header.stickyMobile,
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

export default Header
