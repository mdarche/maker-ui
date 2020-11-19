/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps } from '../types'
import { WorkspaceContext } from './WorkspaceContext'
import { useLayoutDetector } from '../../hooks/useLayoutDetector'
import { getWorkspaceStyles } from '../../utils/styles-workspace'

// Dot compatible JSX children
import { Canvas } from './Canvas'
import { Toolbar } from './Toolbar'
import { Panel } from './Panel'

interface WorkspaceProps
  extends MakerProps,
    React.HtmlHTMLAttributes<HTMLDivElement> {}

export const Workspace = ({ variant, sx, children }: WorkspaceProps) => {
  const { layout, showError } = useLayoutDetector('workspace', children)

  return (
    <WorkspaceContext variant={variant}>
      <div
        id="workspace"
        sx={{ variant, ...getWorkspaceStyles(layout), ...sx }}>
        {showError ? 'Error!' : children}
      </div>
    </WorkspaceContext>
  )
}

Workspace.Canvas = Canvas
Workspace.Toolbar = Toolbar
Workspace.Panel = Panel

Workspace.displayName = 'Workspace'
