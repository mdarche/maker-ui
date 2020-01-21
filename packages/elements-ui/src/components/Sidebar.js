import React from "react"
import { Box } from "@theme-ui/components"

const Sidebar = React.forwardRef((props, ref) => {
  return <Box ref={ref} as="aside" id="primary-sidebar" {...props} />
})

export default Sidebar
