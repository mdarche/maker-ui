/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MaybeElement } from '../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface WidgetProps {
  content?: MaybeElement
  hideOnMobile?: boolean
}

export const WidgetArea = (props: WidgetProps) => {
  const { header } = useOptions()
  const { content, hideOnMobile = header.hideWidgetsOnMobile } = props

  return content ? (
    <div
      className="widget-area"
      sx={{
        variant: 'header.widgets',
        display: hideOnMobile
          ? setBreakpoint(header.breakIndex, ['none', 'flex'])
          : 'flex',
      }}>
      {content}
    </div>
  ) : null
}
