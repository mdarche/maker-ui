/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps, ResponsiveScale } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  maxWidth?: ResponsiveScale
  scrollOverflow?: boolean
}

/**
 * Use the `Topbar` component to display content like announcements, social media icons,
 * or promotions above your header navigation.
 *
 * @see https://maker-ui.com/docs/topbar
 */

export const Topbar = forwardRef<HTMLElement, TopbarProps>(
  (
    {
      bg = 'bg_topbar',
      maxWidth,
      variant = 'topbar',
      scrollOverflow = false,
      children,
      ...props
    },
    ref
  ) => {
    const { topbar } = useOptions()

    return (
      <aside
        ref={ref}
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
)

Topbar.displayName = 'Topbar'
