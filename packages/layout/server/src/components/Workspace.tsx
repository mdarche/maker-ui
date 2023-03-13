import * as React from 'react'
import { cn } from '@maker-ui/utils'

export interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: 'workspace'
  main?: boolean
  closeOnBlur?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
  toggles?: {
    left?: React.ReactNode
    right?: React.ReactNode
  }
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
  left,
  right,
  children,
  toggles,
  className,
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
            <div className="mkui-slot">{left}</div>
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
            <div className="mkui-slot">{right}</div>
          </div>
        </div>
      </div>
      {toggles ? (
        <div className="mkui-workspace-toggles">
          {toggles?.left ?? null}
          {toggles?.right ?? null}
        </div>
      ) : null}
    </>
  )
}

Workspace.displayName = 'Workspace'
Workspace.defaultProps = { _type: 'workspace' }
