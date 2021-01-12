import * as React from 'react'
import { Button, Div, DivProps, ResponsiveScale, generateId } from 'maker-ui'

import { Popover, PopoverProps, Position } from './Popover'

interface TooltipProps extends Omit<DivProps, 'children' | 'bg' | 'color'> {
  label: React.ReactNode
  children: React.ReactNode
  background?: ResponsiveScale
  color?: ResponsiveScale
  gap?: number
  trapFocus?: boolean
  closeOnBlur?: boolean
  noArrow?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  buttonCss?: any
  springConfig?: PopoverProps['springConfig']
  defer?: PopoverProps['defer']
}

/**
 * The `Tooltip` component is a traditional tooltip element for revealing
 * additional information on hover. It includes a wrapper element as well as semantically
 * correct button toggle.
 *
 * @see https://maker-ui.com/docs/components/popovers
 */

export const Tooltip = ({
  label,
  variant,
  noArrow = false,
  position = 'right',
  background = '#555',
  color = '#fff',
  gap = 5,
  springConfig,
  defer,
  buttonCss,
  css,
  children,
}: TooltipProps) => {
  const buttonRef = React.useRef(null)
  const [show, toggle] = React.useState(false)
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
      onMouseOver={e => toggle(true)}
      onMouseOut={e => toggle(false)}>
      <Button
        ref={buttonRef}
        onFocus={e => toggle(true)}
        onBlur={e => typeof label === 'string' && toggle(false)}
        onClick={e => toggle(!show)}
        variant={variant}
        css={buttonCss}
        aria-describedby={tooltipId}>
        {children}
      </Button>
      <Popover
        id={tooltipId}
        role="tooltip"
        anchorRef={buttonRef}
        position={positionData.position}
        gap={positionData.gap}
        show={show}
        defer={defer}
        toggle={toggle}
        containerCss={{ ...styles }}
        springConfig={springConfig}>
        {label}
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
