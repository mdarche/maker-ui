import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import setBreakpoint from '../../utils/set-breakpoint'

const WidgetArea = props => {
  const { header } = useOptions()
  const { custom, hideOnMobile = header.hideWidgetsOnMobile } = props

  return custom ? (
    <Box
      variant="header.widgets"
      className="widget-area"
      sx={{
        display: hideOnMobile
          ? setBreakpoint(header.breakIndex, ['none', 'flex'])
          : 'flex',
      }}>
      {custom}
    </Box>
  ) : null
}

export default WidgetArea
