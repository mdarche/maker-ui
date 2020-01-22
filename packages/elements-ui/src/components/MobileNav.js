import React from "react"
import { Box } from "@theme-ui/components"

import { useMenu } from "../context/ElementsContext"

export const MobileNav = React.forwardRef((props, ref) => {
  const [menu, toggleMenu] = useMenu()

  const visibility = {}
  const transition = {}

  return <Box ref={ref} {...props} sx={{ position: "fixed" }} />
})
