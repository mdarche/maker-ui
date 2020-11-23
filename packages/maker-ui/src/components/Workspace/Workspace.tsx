/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps } from '../types'
import { WorkspaceContext } from './WorkspaceContext'
import { useOptions } from '../../context/OptionContext'
import { useLayoutDetector } from '../../context/LayoutContext'
import { getWorkspaceStyles } from '../../utils/styles-workspace'

// Dot compatible JSX children
import { Canvas } from './Canvas'
import { Toolbar } from './Toolbar'
import { Panel } from './Panel'

interface WorkspaceProps
  extends MakerProps,
    React.HtmlHTMLAttributes<HTMLDivElement> {}

export const Workspace = ({ variant, sx, children }: WorkspaceProps) => {
  const { workspace } = useOptions()
  const { layout, showError } = useLayoutDetector('workspace', children)

  return (
    <WorkspaceContext variant={variant}>
      <div
        id="workspace"
        sx={{
          variant,
          ...getWorkspaceStyles(layout, workspace),
          ...sx,
        }}>
        {showError ? 'Error!' : children}
      </div>
    </WorkspaceContext>
  )
}

Workspace.Canvas = Canvas
Workspace.Toolbar = Toolbar
Workspace.Panel = Panel

Workspace.displayName = 'Workspace'
