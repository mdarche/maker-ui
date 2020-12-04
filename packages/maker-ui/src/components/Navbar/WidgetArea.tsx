/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface WidgetProps {
  content?: React.ReactNode
  hideOnMobile?: boolean
}

/**
 * The `WidgetArea` is used to show an optional area next to the primary
 * navigation that can be used for social icons, shortcut buttons, and search.
 *
 * @internal usage only
 */

export const WidgetArea = (props: WidgetProps) => {
  const { header } = useOptions()
  const { content, hideOnMobile = header.hideWidgetsOnMobile } = props

  return content ? (
    <div
      className="widget-area"
      sx={{
        variant: 'header.widgets',
        display: hideOnMobile
          ? setBreakpoint(header.bpIndex, ['none', 'flex'])
          : 'flex',
      }}>
      {content}
    </div>
  ) : null
}

WidgetArea.displayName = 'WidgetArea'
