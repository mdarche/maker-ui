import * as React from 'react'

export const Canvas = ({ children }) => {
  return (
    <div className="workspace-canvas">
      <div className="workspace-container">{children}</div>
    </div>
  )
}

Canvas.displayName = 'Canvas'
