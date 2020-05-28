import React from 'react'

import { Box } from './Box'
import { MakerProps, MaybeElement } from '../props'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface WidgetProps extends MakerProps {
  custom?: MaybeElement
  hideOnMobile?: boolean
}

export const WidgetArea = (props: WidgetProps) => {
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
