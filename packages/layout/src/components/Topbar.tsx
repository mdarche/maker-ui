/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  type MakerProps,
  type ResponsiveScale,
  type StyleObject,
} from '@maker-ui/css'
import { useMeasure, mergeSelectors, setBreakpoint } from '@maker-ui/utils'
import { useEffect } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'

import { MakerOptions } from '../types'
import { ErrorContainer } from './Errors/ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { useMeasurements } from '../context/LayoutContext'

type StickyType = 'sticky' | ('sticky' | 'relative')[] | undefined

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  /** Overrides the default `--color-bg_topbar` background that you can set with Maker UI Options. */
  background?: string
  /** Overrides `topbar.maxWidth` from Maker UI options. */
  maxWidth?: ResponsiveScale
  /** When true, content overflow will scroll horizontally instead of wrapping to a new line.
   * @default false
   */
  scrollOverflow?: boolean
  /** Overrides `topbar.sticky` from Maker UI options. */
  sticky?: MakerOptions['topbar']['sticky']
  /** Overrides `topbar.stickyOnMobile` from Maker UI options. */
  stickyOnMobile?: MakerOptions['topbar']['stickyOnMobile']
  /** Gives you access to the root container styles */
  _css?: StyleObject
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
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })
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
          overflowX: scrollOverflow ? 'scroll' : undefined,
          whiteSpace: scrollOverflow ? 'nowrap' : undefined,
          maxWidth,
          ...(css as object),
        }}
        {...rest}>
        <ErrorContainer errorKey="topbar">{children}</ErrorContainer>
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
