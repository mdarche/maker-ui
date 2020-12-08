/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import { MakerProps } from '../../types'
import { ErrorBoundary } from '../Errors'
import { useMeasure } from '../../hooks/useMeasure'
import { useMeasurements } from '../../context/LayoutContext'

export interface ToolbarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  background?: string | string[]
  scrollOverflow?: 'wrap' | 'scroll'
}

/**
 * The `Toolbar` component is fixed to the top of the workspace canvas and panels.
 * Use it to add helpful controls or key info to support the workspace.
 *
 */

export const Toolbar = ({
  bg = 'bg_toolbar',
  background,
  variant,
  sx,
  children,
  ...props
}: ToolbarProps) => {
  const { setMeasurement } = useMeasurements()
  const [bind, { height }] = useMeasure()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('toolbar', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  return (
    <div
      {...bind}
      className="toolbar"
      sx={{ bg, background, variant }}
      {...props}>
      {children}
    </div>
  )
}

Toolbar.displayName = 'Toolbar'
