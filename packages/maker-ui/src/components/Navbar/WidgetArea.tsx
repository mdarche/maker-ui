/** @jsx jsx */
import { jsx } from '@emotion/react'

import { useOptions } from '../../context/OptionContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'

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
  const { mediaQuery } = useMediaQuery('header')

  return content ? (
    <div
      className="widget-area"
      css={{
        ...mediaQuery(
          'display',
          header.hideWidgetsOnMobile ? ['none', 'flex'] : ['flex']
        ),
      }}>
      {content}
    </div>
  ) : null
}

WidgetArea.displayName = 'WidgetArea'
