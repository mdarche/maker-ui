import * as React from 'react'
import type { PanelOptions } from '@/types'
import { cn } from '@maker-ui/utils'
import { renderNode } from '@/utils'

export interface PanelProps
  extends Partial<PanelOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'leftPanel' | 'rightPanel'
}

export const Panel = ({
  isHeader,
  collapseWidth,
  defaultOpen,
  closeOnRouteChange,
  menuButton,
  children,
  className,
  _type,
  ...props
}: PanelProps) => {
  const isLeft = _type === 'leftPanel'
  const isFixed =
    typeof menuButton === 'object' &&
    menuButton !== null &&
    'props' in menuButton
      ? menuButton?.props?.fixed
      : false

  return (
    <>
      {React.createElement(
        isHeader ? 'header' : 'div',
        {
          className: cn(['mkui-panel', isLeft ? 'left' : 'right', className]),
          ...props,
        },
        <div className="mkui-panel-inner">
          <div className="mkui-slot">
            {children}
            {!isFixed ? renderNode(menuButton) : null}
          </div>
        </div>
      )}
      {isFixed ? renderNode(menuButton) : null}
    </>
  )
}

Panel.displayName = 'Panel'
