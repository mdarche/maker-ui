import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { WorkspaceOptions } from '@/types'
import { renderNode } from '../utils'

export interface WorkspaceProps
  extends Partial<WorkspaceOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'workspace'
}

/**
 * The `Workspace` layout component lets you use two collapsible sidebars
 * and a main content area. It is a wrapper for complex layouts that require
 * multiple control panels.
 *
 * @link https://maker-ui.com/docs/layout/workspace
 */
export const Workspace = ({
  main,
  closeOnBlur,
  leftPanel,
  rightPanel,
  children,
  menuButtons,
  defaultOpen,
  className,
  breakpoint,
  _type,
  ...props
}: WorkspaceProps) => {
  return (
    <>
      <div
        className={cn([
          'mkui-workspace ws-left-active ws-right-active',
          'mkui-layout-init',
          className,
        ])}
        {...props}>
        <div
          className="mkui-overlay mkui-overlay-w"
          role={closeOnBlur ? 'button' : undefined}
        />
        <div className={cn(['mkui-panel mkui-panel-left'])}>
          <div className="mkui-panel-inner">
            <div className="mkui-slot">{leftPanel}</div>
          </div>
        </div>
        {React.createElement(
          main ? 'main' : 'div',
          {
            id: main ? 'content' : props?.id,
            className: cn(['mkui-panel mkui-panel-center', className]),
            ...props,
          },
          children
        )}
        <div className={cn(['mkui-panel-right'])}>
          <div className="mkui-panel-inner">
            <div className="mkui-slot">{rightPanel}</div>
          </div>
        </div>
      </div>
      {menuButtons ? (
        <div className="mkui-workspace-toggles">
          {renderNode(menuButtons?.left)}
          {renderNode(menuButtons?.right)}
        </div>
      ) : null}
    </>
  )
}

Workspace.displayName = 'Workspace'
Workspace.defaultProps = { _type: 'workspace' }
