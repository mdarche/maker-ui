import * as React from 'react'
import {
  Button,
  Div,
  DivProps,
  ResponsiveScale,
  generateId,
  StyleObject,
} from 'maker-ui'

import { Popover, PopoverProps, Position } from './Popover'

interface TooltipProps extends Omit<DivProps, 'children' | 'color'> {
  label: React.ReactNode
  children: React.ReactNode
  background?: ResponsiveScale
  color?: ResponsiveScale
  gap?: number
  trapFocus?: boolean
  closeOnBlur?: boolean
  noArrow?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  buttonCss?: StyleObject
  _css?: StyleObject
  spring?: PopoverProps['spring']
  defer?: PopoverProps['defer']
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
  background = '#555',
  color = '#fff',
  gap = 5,
  spring,
  defer,
  buttonCss,
  css,
  children,
  ...props
}: TooltipProps) => {
  const buttonRef = React.useRef(null)
  const [show, set] = React.useState(false)
  const [tooltipId] = React.useState(generateId())

  const positionData = convertPosition(position, background, gap)

  const styles: object = {
    background,
    color,
    padding: 5,
    borderRadius: 3,
    ':after': !noArrow && {
      content: '""',
      position: 'absolute',
      borderWidth: 5,
      borderStyle: 'solid',
      ...positionData.styles,
    },
    ...(css as object),
  }

  return (
    <Div
      css={{ display: 'inline-block' }}
      onMouseOver={() => set(true)}
      onMouseOut={() => set(false)}
      {...props}>
      <Button
        ref={buttonRef}
        onFocus={() => set(true)}
        onBlur={() => typeof label === 'string' && set(false)}
        onClick={() => set(!show)}
        css={buttonCss}
        aria-describedby={tooltipId}>
        {label}
      </Button>
      <Popover
        id={tooltipId}
        className="tooltip"
        role="tooltip"
        anchorRef={buttonRef}
        position={positionData.position}
        gap={positionData.gap}
        show={show}
        defer={defer}
        set={set}
        _css={{ ...styles }}
        spring={spring}>
        {children}
      </Popover>
    </Div>
  )
}

Tooltip.displayName = 'Tooltip'

/**
 * Format the simpler Tooltip API to work with the `Popover` parent.
 */

function convertPosition(
  pos: string,
  bg: ResponsiveScale,
  gap: number
): { position: Position; styles: object; gap: { x: number; y: number } } {
  const vertical = { left: '50%', marginLeft: '-5px' }
  const horizontal = { top: '50%', marginTop: '-5px' }

  switch (pos) {
    case 'top':
      return {
        position: { x: 'center', y: 'top' },
        gap: { x: 0, y: gap },
        styles: {
          top: '100%',
          ...vertical,
          borderColor: `${bg} transparent transparent transparent`,
        },
      }
    case 'bottom':
      return {
        position: { x: 'center', y: 'bottom' },
        gap: { x: 0, y: gap },
        styles: {
          bottom: '100%',
          ...vertical,
          borderColor: `transparent transparent ${bg} transparent`,
        },
      }
    case 'left':
      return {
        position: { x: 'left', y: 'center' },
        gap: { x: gap, y: 0 },
        styles: {
          left: '100%',
          ...horizontal,
          borderColor: `transparent transparent transparent ${bg}`,
        },
      }
    case 'right':
    default:
      return {
        position: { x: 'right', y: 'center' },
        gap: { x: gap, y: 0 },
        styles: {
          right: '100%',
          ...horizontal,
          borderColor: `transparent ${bg} transparent transparent`,
        },
      }
  }
}
