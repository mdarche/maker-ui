/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Panel = ({ bg = 'bg_panel', children }) => {
  return (
    <div className="workspace-panel" sx={{ overflow: 'hidden' }}>
      <div
        className="workspace-container"
        sx={{ bg, height: '100%', overflowY: 'scroll' }}>
        {children}
      </div>
    </div>
  )
}

Panel.displayName = 'Panel'
