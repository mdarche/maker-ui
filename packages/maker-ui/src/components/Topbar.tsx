/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import { MakerOptions, MakerProps, ResponsiveScale } from '../types'
import { ErrorBoundary } from './Errors/ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  maxWidth?: ResponsiveScale
  scrollOverflow?: boolean
  sticky?: MakerOptions['topbar']['sticky']
  stickyOnMobile?: MakerOptions['topbar']['stickyOnMobile']
}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @see https://maker-ui.com/docs/layout/topbar
 */

export const Topbar = (props: TopbarProps) => {
  const { topbar } = useOptions()
  const [layout] = useLayout('content')
  const [bind, { height }] = useMeasure({
    observe: layout.includes('workspace'),
  })
  const { setMeasurement } = useMeasurements()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('topbar', height)
    }
  }, [height])

  const {
    bg = 'bg_topbar',
    maxWidth,
    variant = 'topbar',
    sticky = topbar.sticky,
    stickyOnMobile = topbar.stickyOnMobile,
    scrollOverflow = false,
    children,
    ...rest
  } = props

  const stickyPartial = sticky
    ? {
        position: stickyOnMobile
          ? 'sticky'
          : setBreakpoint(topbar.bpIndex, ['relative', 'sticky']),
      }
    : !sticky && stickyOnMobile
    ? {
        position: setBreakpoint(topbar.bpIndex, ['sticky', 'relative']),
      }
    : null

  return (
    <aside
      {...bind}
      id="topbar"
      sx={{
        bg,
        variant,
        top: 0,
        zIndex: 100,
        ...stickyPartial,
        display: topbar.hideOnMobile
          ? setBreakpoint(topbar.bpIndex, ['none', 'block'])
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
        {...rest}>
        <ErrorBoundary errorKey="topbar">{children}</ErrorBoundary>
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
