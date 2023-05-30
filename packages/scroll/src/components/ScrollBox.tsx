import * as React from 'react'
import { cleanObject, formatNumber } from '@maker-ui/utils'

interface ScrollBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The width of the scroll box. Accepts a number (interpreted as pixels) or a string
   * (any valid CSS unit).
   * @default '100%' */
  width?: number | string
  /** The height of the scroll box. Accepts a number (interpreted as pixels) or a string
   * (any valid CSS unit).
   * @default '100%' */
  height?: number | string
  /** The width of the scrollbar. Accepts a number (interpreted as pixels) or a string
   * (any valid CSS unit)
   * @default 15 */
  barWidth?: number | string
  /** The border of the scroll box. Any valid CSS border value. */
  border?: string
  /** The box shadow of the scroll box. Any valid CSS box-shadow value. */
  boxShadow?: string
}

/**
 * `ScrollBox` creates a customizable scrollable container. The width, height,
 * scrollbar width, border, and box shadow of the container can all be customized.
 *
 * It uses CSS custom properties for styling and cleans up any undefined or null
 * style values before applying them.
 */
export const ScrollBox = ({
  width = '100%',
  height = '100%',
  barWidth = 15,
  border,
  boxShadow,
  children,
  ...props
}: ScrollBoxProps) => {
  const styles = cleanObject({
    '--scroll-box-width': formatNumber(width),
    '--scroll-box-height': formatNumber(height),
    '--scroll-bar-width': formatNumber(barWidth),
    border,
    boxShadow,
  }) as React.CSSProperties

  return (
    <div className="mkui-scrollbox" style={styles} {...props}>
      <div className="mkui-scrollbox-inner">{children}</div>
    </div>
  )
}
