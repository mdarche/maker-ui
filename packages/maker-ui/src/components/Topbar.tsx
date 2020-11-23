/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import { MakerProps, ResponsiveScale } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  maxWidth?: ResponsiveScale
  scrollOverflow?: boolean
}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @see https://maker-ui.com/docs/layout/topbar
 */

export const Topbar = ({
  bg = 'bg_topbar',
  maxWidth,
  variant = 'topbar',
  scrollOverflow = false,
  children,
  ...props
}: TopbarProps) => {
  const { topbar } = useOptions()
  const [layout] = useLayout('content')
  const [bind, { height }] = useMeasure(layout.includes('workspace'))
  const { setMeasurement } = useMeasurements()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('topbar', height)
    }
  }, [height])

  return (
    <aside
      {...bind}
      id="topbar"
      sx={{
        bg,
        variant,
        display: topbar.hideOnMobile
          ? setBreakpoint(topbar.breakIndex, ['none', 'block'])
          : 'block',
      }}>
      <div
        className="container"
        sx={{
          mx: 'auto',
          overflowX: scrollOverflow ? 'scroll' : null,
          whiteSpace: scrollOverflow ? 'nowrap' : null,
          maxWidth: maxWidth || (t => t.sizes.maxWidth_topbar),
        }}
        {...props}>
        <ErrorBoundary errorKey="topbar">{children}</ErrorBoundary>
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
