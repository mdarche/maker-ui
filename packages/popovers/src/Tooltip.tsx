import * as React from 'react'
import { type ResponsiveCSS, type Breakpoints } from '@maker-ui/style'

import { Popover, PopoverProps } from './Popover'
import { convertPosition, TransitionType } from './position'

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
  breakpoints?: Breakpoints
  css?: ResponsiveCSS
  /** The inner contents of the Tooltip button */
  label: React.ReactNode
  /** The background color of the Tooltip
   * @default "#333"
   */
  background?: string | string[]
  /** The color of the Tooltip text
   * @default "#fff"
   */
  color?: string | string[]
  /** The padding between the Tooltip button and the Tooltip content
   * @default 5
   */
  gap?: number
  /** If true, the Tooltip will prevent keyboard focus from exiting the component.
   * @default false
   */
  trapFocus?: boolean
  /** If true, the Tooltip will close when keyboard focus leaves the component.
   * @default true
   */
  closeOnBlur?: boolean
  /** If true, the Tooltip box will not show an arrow.
   * @default false
   */
  noArrow?: boolean
  /** The position of the Tooltip relative to the Tooltip button.
   * @default "right"
   */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /**Responsive CSS that is applied to the tooltip button. */
  buttonCss?: ResponsiveCSS
  /** Responsive CSS that is applied to the Popover container. */
  _css?: ResponsiveCSS
  /** A number in milliseconds that indicates how long React should wait to calculate the
   * position of the Popover. This is helpful if your page uses a Page Transition on each load.
   * @default 200
   * @remark this will be deprecated in the next major release
   */
  defer?: PopoverProps['defer']
  /** Predefined transition styles that you can use to toggle the Popover.
   * @default "fade"
   */
  transition?: TransitionType
  /** The contents of your Tooltip component. */
  children: React.ReactNode
}

/**
 * The `Tooltip` component is a traditional tooltip element for revealing
 * additional information on hover. It includes a wrapper element as well as semantically
 * correct button toggle.
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Tooltip = ({
  label,
  noArrow = false,
  position = 'right',
  background = '#333',
  color = '#fff',
  gap = 5,
  defer,
  buttonCss,
  css,
  transition,
  children,
  ...props
}: TooltipProps) => {
  const buttonRef = React.useRef(null)
  const [show, set] = React.useState(false)
  const tooltipId = React.useId()

  const positionData = convertPosition(position, background, gap)

  const styles: ResponsiveCSS = {
    background,
    color,
    padding: 5,
    borderRadius: 3,
    '&:after': !noArrow
      ? {
          content: '""',
          position: 'absolute',
          borderWidth: 5,
          borderStyle: 'solid',
          ...positionData.styles,
        }
      : undefined,
    ...(css as object),
  }

  return (
    <div
      style={{ display: 'inline-block' }}
      onMouseOver={() => set(true)}
      onMouseOut={() => set(false)}
      {...props}>
      <button
        ref={buttonRef}
        type="button"
        onFocus={() => set(true)}
        onBlur={() => typeof label === 'string' && set(false)}
        onClick={() => set(!show)}
        // css={buttonCss}
        aria-describedby={tooltipId}>
        {label}
      </button>
      <Popover
        id={tooltipId}
        className="tooltip"
        role="tooltip"
        anchorRef={buttonRef}
        transition={transition}
        position={positionData.position}
        gap={positionData.gap}
        show={show}
        set={set}
        defer={defer}
        _css={styles}>
        {children}
      </Popover>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
