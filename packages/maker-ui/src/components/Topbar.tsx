/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import { MakerProps, ResponsiveScale } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { useOptions, useOptionUpdater } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'
import { useMeasure } from '../hooks/useMeasure'

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

export const Topbar = ({
  bg = 'bg_topbar',
  maxWidth,
  variant = 'topbar',
  scrollOverflow = false,
  children,
  ...props
}: TopbarProps) => {
  const { topbar, layout } = useOptions()
  const [bind, { height }] = useMeasure(layout.includes('workspace'))
  const setOptions = useOptionUpdater()

  useEffect(() => {
    if (height !== 0) {
      setOptions({ measure: { topbar: height } })
    }
  }, [height])

  return (
    <aside
      {...bind}
      id="topbar"
      sx={{
        bg,
        variant,
        boxSizing: 'border-box',
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
