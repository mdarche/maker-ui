/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'

import { WorkspaceContext } from './WorkspaceContext'
import { getLayoutType } from '../../utils/helper'
import { Canvas } from './Canvas'
import { Toolbar } from './Toolbar'
import { Panel } from './Panel'

const layoutTypes = [
  'panel canvas panel',
  'panel canvas',
  'canvas panel',
  'canvas',
]

export const Workspace = ({ children }) => {
  const [debugMessage, setDebugMessage] = useState(false)

  useEffect(() => {
    const currentLayout = getLayoutType('workspace', children)
    // Get the current layout and pass to context
  }, [])
  return (
    <WorkspaceContext>
      <div>{children}</div>
    </WorkspaceContext>
  )
}

Workspace.Canvas = Canvas
Workspace.Toolbar = Toolbar
Workspace.Panel = Panel

Workspace.displayName = 'Workspace'
