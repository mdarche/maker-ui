/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface WidgetProps {
  content?: React.ReactNode
}

/**
 * The `WidgetArea` is used to show an optional area next to the primary
 * navigation that can be used for social icons, shortcut buttons, and search.
 *
 * @internal usage only
 */

export const WidgetArea = ({ content }: WidgetProps) => {
  const { header } = useOptions()

  return content ? (
    <div
      className="widget-area"
      sx={{
        variant: 'header.widgets',
        display: header.hideWidgetsOnMobile
          ? setBreakpoint(header.bpIndex, ['none', 'flex'])
          : 'flex',
      }}>
      {content}
    </div>
  ) : null
}

WidgetArea.displayName = 'WidgetArea'
