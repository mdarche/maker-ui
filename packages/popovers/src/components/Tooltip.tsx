import React, { useState, useRef } from 'react'
import { cn } from '@maker-ui/utils'

import { Popover } from './Popover'
import type { PopoverProps } from '@/types'
import { getPosition } from '../position'
import { cssVariables } from '../variables'

interface TooltipProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'id' | 'children' | 'color'
    >,
    Omit<PopoverProps, 'show' | 'set' | 'anchorRef' | 'position' | 'offset'> {
  id: string
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
}

/**
 * The `Tooltip` component is a traditional tooltip element for revealing
 * additional information on hover. It includes a wrapper element as well as semantically
 * correct button toggle.
 *
 * @link https://maker-ui.com/docs/elements/popovers
 */

export const Tooltip = ({
  id,
  classNames,
  label,
  position = 'bottom',
  offset = 5,
  transition = 'fade',
  styles,
  children,
  ...props
}: TooltipProps) => {
  const [show, set] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const pos = getPosition(position, offset)
  const variables = cssVariables({ button: styles?.button }, 'tooltip')

  return (
    <div
      className={cn(['mkui-tooltip-wrapper inline-flex', classNames?.wrapper])}
      onMouseOver={() => set(true)}
      onMouseOut={() => set(false)}
      style={{ ...(variables || {}), ...(props?.style || {}) }}
      {...props}>
      <button
        ref={ref}
        className={cn(['mkui-btn-tooltip', classNames?.button])}
        type="button"
        onFocus={() => set(true)}
        onBlur={() => typeof label === 'string' && set(false)}
        onClick={() => set(!show)}
        aria-describedby={`tooltip-${id}`}>
        {label}
      </button>
      <Popover
        id={`tooltip-${id}`}
        className={cn(['mkui-tooltip', classNames?.tooltip])}
        {...{
          role: 'tooltip',
          anchorRef: ref,
          position: pos.position,
          offset: pos.offset,
          transition,
          show,
          set,
          styles,
        }}>
        {children}
      </Popover>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
