/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Panel = ({ bg = 'bg_panel', children }) => {
  return (
    <div className="workspace-panel">
      <div className="panel-container" sx={{ bg, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

Panel.displayName = 'Panel'
