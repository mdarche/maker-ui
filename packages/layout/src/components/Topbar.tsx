/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { useEffect } from 'react'
import useMeasure from 'react-use-measure'

import { MakerOptions } from '../types'
import { ErrorBoundary } from './Errors/ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { useMeasurements } from '../context/LayoutContext'
import { mergeSelectors, setBreakpoint } from '../utils/helper'

type StickyType = 'sticky' | ('sticky' | 'relative')[] | undefined

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string
  maxWidth?: ResponsiveScale
  scrollOverflow?: boolean
  sticky?: MakerOptions['topbar']['sticky']
  stickyOnMobile?: MakerOptions['topbar']['stickyOnMobile']
  _css?: MakerProps['css']
}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @TODO - revisit hide on mobile / sticky style conflict
 *
 * @link https://maker-ui.com/docs/layout/topbar
 */

export const Topbar = (props: TopbarProps) => {
  const { topbar, breakpoints } = useOptions()
  const [ref, { height }] = useMeasure()
  const { setMeasurement } = useMeasurements()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('topbar', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  const {
    id,
    background = 'var(--color-bg_topbar)',
    maxWidth = 'var(--maxWidth_topbar)',
    sticky = topbar.sticky,
    stickyOnMobile = topbar.stickyOnMobile,
    scrollOverflow = false,
    className,
    _css,
    css,
    children,
    ...rest
  } = props

  const stickyPartial: StickyType = sticky
    ? stickyOnMobile
      ? 'sticky'
      : ['relative', 'sticky']
    : !sticky && stickyOnMobile
    ? ['sticky', 'relative']
    : undefined

  return (
    <aside
      ref={ref}
      id={mergeSelectors(['topbar', id])}
      className={className}
      breakpoints={setBreakpoint(topbar.breakpoint, breakpoints)}
      css={{
        background,
        top: 0,
        zIndex: 101,
        position: stickyPartial,
        display: topbar.hideOnMobile ? ['none', 'block'] : ['block'],
        ...(_css as object),
      }}>
      <div
        className="container"
        css={{
          margin: '0 auto',
          overflowX: scrollOverflow ? 'scroll' : undefined,
          whiteSpace: scrollOverflow ? 'nowrap' : undefined,
          maxWidth,
          ...(css as object),
        }}
        {...rest}>
        <ErrorBoundary errorKey="topbar">{children}</ErrorBoundary>
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
