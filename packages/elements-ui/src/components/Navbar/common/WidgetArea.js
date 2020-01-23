import React from "react"
import { Box } from "theme-ui"

import { useOptions } from "../../../context/ElementsContext"

const WidgetArea = ({ custom }) => {
  const { header } = useOptions()

  return custom ? (
    <Box
      variant="header.widgets"
      sx={{ display: header.hideWidgetsOnMobile ? ["none", "flex"] : "flex" }}>
      {custom}
    </Box>
  ) : null
}

export default WidgetArea
