import React, { useState, useRef, useCallback, useLayoutEffect } from 'react'
import { Button, Div } from 'maker-ui'

import { Popover } from './Popover'

interface DropdownProps {
  buttonVariant?: string | string[]
  buttonInner?: string | React.ReactElement
  matchWidth?: boolean
  sx?: any
  children: React.ReactElement | React.ReactElement[]
}

export const Dropdown = ({
  buttonVariant = 'dropdownButton',
  buttonInner = 'Dropdown',
  matchWidth = false,
  sx,
  children,
}: DropdownProps) => {
  const buttonRef = useRef(null)
  const [initial, setInitial] = useState(true)
  const [show, set] = useState(true)
  const [height, setHeight] = useState(0)

  // Measure invisible child container on first render and then hide

  useLayoutEffect(() => {
    setInitial(false)
    set(false)
  }, [])

  const measuredRef = useCallback(
    node => {
      if (node !== null && height === 0) {
        setHeight(node.offsetHeight)
      }
    },
    [height]
  )

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={e => set(!show)}
        sx={{ variant: buttonVariant, ...sx }}>
        {buttonInner}
      </Button>
      <Popover
        anchor={buttonRef}
        anchorWidth={matchWidth}
        show={show}
        containerHeight={height}
        transition="scale">
        <Div
          ref={measuredRef}
          sx={{ opacity: initial && [0], visibility: initial && ['hidden'] }}>
          {children}
        </Div>
      </Popover>
    </>
  )
}
