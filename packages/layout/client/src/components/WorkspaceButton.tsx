import * as React from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { type MakerCSS, Style } from '@maker-ui/style'
import { useMenu } from './Provider'

type Responsive = string | number | (string | number)[]
interface WorkspaceButtonProps
  extends MakerCSS,
    React.HTMLAttributes<HTMLButtonElement> {
  left?: boolean
  right?: boolean
  hideOnMobile?: boolean
  fixed?: boolean
  position?: {
    top?: Responsive
    left?: Responsive
    bottom?: Responsive
    right?: Responsive
  }
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
  fixed = false,
  position,
  left,
  right,
  style,
  hideOnMobile,
  breakpoints,
  css,
  mediaQuery,
  children,
  ...props
}: WorkspaceButtonProps) => {
  const { active, setMenu } = useMenu()
  const [styleId] = React.useState(generateId())
  const isLeft = !!left
  const panel = isLeft ? 'leftPanel' : 'rightPanel'
  const title = `Toggle ${isLeft ? 'Left' : 'Right'} Panel`

  function togglePanel() {
    setMenu(isLeft ? 'left-panel' : 'right-panel', !active![panel])
  }

  const styles =
    position && fixed
      ? ({
          zIndex: 10,
          top: position?.top,
          bottom: position?.bottom,
          left: position?.left,
          right: position?.right,
        } as MakerCSS)
      : undefined

  const attributes = {
    title,
    className: cn([
      'mkui-btn-workspace',
      fixed ? 'fixed' : undefined,
      styleId,
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
    <>
      <button {...attributes}>
        {children}
        {position && fixed ? (
          <Style
            root={styleId}
            css={styles}
            mediaQuery={mediaQuery}
            breakpoints={breakpoints}
          />
        ) : null}
      </button>
    </>
  )
}

WorkspaceButton.displayName = 'WorkspaceButton'
