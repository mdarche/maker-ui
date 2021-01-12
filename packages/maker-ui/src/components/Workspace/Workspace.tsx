/** @jsx jsx */
import { jsx } from '@emotion/react'

import { MakerProps } from '../../types'
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
    Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'css'> {}

export const Workspace = ({ css, children }: WorkspaceProps) => {
  const { workspace } = useOptions()
  const { layout, showError } = useLayoutDetector('workspace', children)

  return (
    <WorkspaceContext>
      <div
        id="workspace"
        css={{
          ...getWorkspaceStyles(layout, workspace),
          ...(css as object),
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
