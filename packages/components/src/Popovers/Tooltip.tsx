import React, { useState, useRef } from 'react'
import { Button, Flex, DivProps, generateId } from 'maker-ui'

import { Popover, Position } from './Popover'

interface TooltipProps extends Omit<DivProps, 'children'> {
  trapFocus?: boolean
  closeOnBlur?: boolean
  position?: Position
  label: string | React.ReactElement
  children: string | React.ReactElement
}

export const Tooltip = ({
  label,
  variant,
  position = { x: 'right', y: 'center' },
  sx,
  children,
}: TooltipProps) => {
  const buttonRef = useRef(null)
  const [show, toggle] = useState(false)
  const [tooltipId] = useState(generateId())

  return (
    <Flex
      inline
      onMouseOver={e => toggle(true)}
      onMouseOut={e => toggle(false)}>
      <Button
        ref={buttonRef}
        onFocus={e => toggle(true)}
        onBlur={e => typeof label === 'string' && toggle(false)}
        onClick={e => toggle(!show)}
        variant={variant}
        sx={{ sx }}
        aria-describedby={tooltipId}>
        {children}
      </Button>
      <Popover
        id={tooltipId}
        role="tooltip"
        position={position}
        anchorRef={buttonRef}
        show={show}
        toggle={toggle}>
        {label}
      </Popover>
    </Flex>
  )
}
