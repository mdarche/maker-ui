import * as React from 'react'
import { formatUnit } from './utils'

interface ScrollBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  barWidth?: number | string
  border?: string
  boxShadow?: string
}

export const ScrollBox = ({
  width = '100%',
  height = '100%',
  barWidth = 15,
  border,
  boxShadow,
  children,
  ...props
}: ScrollBoxProps) => {
  const styles = {
    '--scroll-box-width': formatUnit(width),
    '--scroll-box-height': formatUnit(height),
    '--scroll-bar-width': formatUnit(barWidth),
    border,
    boxShadow,
  } as React.CSSProperties

  return (
    <div className="mkui-scrollbox" style={styles} {...props}>
      <div className="mkui-scrollbox-inner">{children}</div>
    </div>
  )
}
