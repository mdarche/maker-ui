/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect } from 'react'

import { MakerProps } from '../../types'
import { ErrorBoundary } from '../Errors'
import { useMeasure } from '../../hooks/useMeasure'
import { useMeasurements } from '../../context/LayoutContext'

export interface PanelProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  bg?: string | string[]
  background?: string | string[]
}

/**
 * The `Panel` component is positioned on one or either side of the workspace
 * canvas and lets you control settings with `WorkspaceContext`.
 *
 */

export const Panel = ({
  bg = 'bg_panel',
  background,
  variant,
  sx,
  children,
  ...props
}: PanelProps) => {
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
      className="panel"
      sx={{
        bg,
        background,
        gridArea: 'panel',
        variant,
        ...sx,
      }}
      {...props}>
      <ErrorBoundary errorKey="toolbar">{children}</ErrorBoundary>
    </div>
  )
}

Panel.displayName = 'Panel'
