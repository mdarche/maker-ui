/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MaybeElement } from '../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface WidgetProps {
  custom?: MaybeElement
  hideOnMobile?: boolean
}

export const WidgetArea = (props: WidgetProps) => {
  const { header } = useOptions()
  const { custom, hideOnMobile = header.hideWidgetsOnMobile } = props

  return custom ? (
    <div
      className="widget-area"
      sx={{
        variant: 'header.widgets',
        display: hideOnMobile
          ? setBreakpoint(header.breakIndex, ['none', 'flex'])
          : 'flex',
      }}>
      {custom}
    </div>
  ) : null
}
