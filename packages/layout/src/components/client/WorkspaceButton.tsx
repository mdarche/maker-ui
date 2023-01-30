'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useMenu } from './Provider'

interface WorkspaceButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  left?: boolean
  right?: boolean
  hideOnMobile?: boolean
  renderProps?: (isActive: boolean, attrs?: object) => React.ReactNode
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @link https://maker-ui.com/docs/layout/color-button
 */
export const WorkspaceButton = ({
  className,
  renderProps,
  left,
  right,
  hideOnMobile,
  children,
  ...props
}: WorkspaceButtonProps) => {
  const { active, setMenu } = useMenu()
  const isLeft = !!left
  const panel = isLeft ? 'leftPanel' : 'rightPanel'
  const title = `Toggle ${isLeft ? 'Left' : 'Right'} Panel`

  function togglePanel() {
    setMenu(isLeft ? 'left-panel' : 'right-panel', !active![panel])
  }

  const attributes = {
    title,
    className: cn([
      'mkui-btn-workspace',
      className,
      hideOnMobile ? 'mobile-hide' : undefined,
      !active![panel] ? 'active' : undefined,
    ]),
    'aria-label': title,
    onClick: togglePanel,
    ...props,
  }

  return renderProps ? (
    <>{renderProps(active![panel], attributes) as React.ReactNode}</>
  ) : (
    <button {...attributes}>{children}</button>
  )
}

WorkspaceButton.displayName = 'WorkspaceButton'
