import React, { useState, useRef } from 'react'
import { Button, Div, DivProps, ResponsiveScale, generateId } from 'maker-ui'

import { Popover, Position } from './Popover'

function convertPosition(
  pos: string,
  bg: ResponsiveScale,
  gap: number
): { position: Position; styles: object; gap: { x: number; y: number } } {
  const vertical = { left: '50%', ml: '-5px' }
  const horizontal = { top: '50%', mt: '-5px' }

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

interface TooltipProps extends Omit<DivProps, 'children' | 'bg' | 'color'> {
  label: string | React.ReactElement
  children: string | React.ReactElement
  bg?: ResponsiveScale
  color?: ResponsiveScale
  gap?: number
  trapFocus?: boolean
  closeOnBlur?: boolean
  noArrow?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  buttonSx?: any
}

export const Tooltip = ({
  label,
  variant,
  noArrow = false,
  position = 'right',
  bg = '#555',
  color = '#fff',
  gap = 5,
  buttonSx,
  sx,
  children,
}: TooltipProps) => {
  const buttonRef = useRef(null)
  const [show, toggle] = useState(false)
  const [tooltipId] = useState(generateId())

  const positionData = convertPosition(position, bg, gap)

  // console.log('Position is', positionData.position)

  const styles = {
    bg,
    color,
    p: '5px',
    borderRadius: 3,
    ':after': !noArrow && {
      content: '""',
      position: 'absolute',
      borderWidth: 5,
      borderStyle: 'solid',
      ...positionData.styles,
    },
    ...sx,
  }

  return (
    <Div
      sx={{ display: 'inline-block' }}
      onMouseOver={e => toggle(true)}
      onMouseOut={e => toggle(false)}>
      <Button
        ref={buttonRef}
        onFocus={e => toggle(true)}
        onBlur={e => typeof label === 'string' && toggle(false)}
        onClick={e => toggle(!show)}
        variant={variant}
        sx={buttonSx}
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
        toggle={toggle}
        containerSx={styles}>
        {label}
      </Popover>
    </Div>
  )
}
