import React from "react"
import { Box } from "@theme-ui/components"

import { useOptions, useOptionsUpdater } from "../context/ElementsContext"

const BasicNav = props => (
  <>
    <Box>Logo</Box>
    <Box>
      <Box>Navlinks</Box>
      <Box>WidgetArea</Box>
    </Box>
  </>
)

const SplitNav = props => (
  <>
    <Box>
      <Box>Navlinks</Box>
    </Box>
    <Box>Logo</Box>
    <Box>
      <Box>Navlinks</Box>
    </Box>
  </>
)

const CenterNav = props => (
  <>
    <Box>Logo</Box>
    <Box>
      <Box>Navlinks</Box>
      <Box>WidgetArea</Box>
    </Box>
  </>
)

export const Navbar = ({
  type,
  ...props
  // menuItems,
  // menuButton,
  // widgetArea,
  // colorToggle,
}) => {
  const { navType } = useOptions()
  const setOptions = useOptionsUpdater()

  if (type !== undefined && navType !== type) {
    setOptions({ navType: type })
  }

  switch (navType) {
    case "split":
      return <SplitNav {...props} />
    case "centered":
      return <CenterNav {...props} />
    default:
      return <BasicNav {...props} />
  }
}
