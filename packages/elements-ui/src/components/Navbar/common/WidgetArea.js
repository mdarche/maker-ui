import React from "react"
import { Box } from "theme-ui"

import { useOptions } from "../../../context/ElementsContext"

const WidgetArea = props => {
  const { header } = useOptions()
  const { custom, hideOnMobile = header.hideWidgetsOnMobile } = props

  return custom ? (
    <Box
      variant="header.widgets"
      sx={{ display: hideOnMobile ? ["none", "flex"] : "flex" }}>
      {custom}
    </Box>
  ) : null
}

export default WidgetArea
