import React, { useState, useRef } from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { Style, type ResponsiveCSS } from '@maker-ui/style'

import { Popover, PopoverProps } from './Popover'
import { getPosition } from './position'

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Omit<PopoverProps, 'show' | 'set' | 'anchorRef' | 'position' | 'offset'> {
  classNames?: {
    tooltip?: string
    button?: string
    wrapper?: string
  }
  /** The amount of space (in pixels) between the tooltip and its anchor element.
   * @default 5
   */
  offset?: number
  /** The inner contents of the Tooltip button */
  label: React.ReactNode
  /** The position of the Tooltip relative to the Tooltip button.
   * @default "bottom"
   */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Responsive CSS that is applied to the Tooltip button. */
  cssButton?: ResponsiveCSS
}

/**
 * The `Tooltip` component is a traditional tooltip element for revealing
 * additional information on hover. It includes a wrapper element as well as semantically
 * correct button toggle.
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Tooltip = ({
  classNames,
  label,
  position = 'bottom',
  offset = 5,
  css,
  cssButton = {},
  transition = 'fade',
  children,
  ...props
}: TooltipProps) => {
  const [styleId] = useState(generateId())
  const [show, set] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const pos = getPosition(position, offset)

  return (
    <div
      className={cn(['mkui-tooltip-wrapper inline-flex', classNames?.wrapper])}
      onMouseOver={() => set(true)}
      onMouseOut={() => set(false)}
      {...props}>
      {cssButton && <Style root={styleId} css={cssButton} />}
      <button
        ref={ref}
        className={cn(['mkui-btn-tooltip', classNames?.button, styleId])}
        type="button"
        onFocus={() => set(true)}
        onBlur={() => typeof label === 'string' && set(false)}
        onClick={() => set(!show)}
        aria-describedby={`tooltip-${styleId}`}>
        {label}
      </button>
      <Popover
        _type="tooltip"
        id={`tooltip-${styleId}`}
        className={cn(['mkui-tooltip', classNames?.tooltip])}
        {...{
          role: 'tooltip',
          anchorRef: ref,
          position: pos.position,
          offset: pos.offset,
          transition,
          show,
          set,
          css,
        }}>
        {children}
      </Popover>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
