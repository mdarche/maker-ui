import React from 'react'

import { Button, SVG } from './Box'

interface ExpandButtonProps {
  show: boolean
  set: Function
}

export const ExpandButton = ({ show, set }: ExpandButtonProps) => {
  return (
    <Button
      title="Expand Section"
      className="submenu-toggle"
      aria-expanded={show ? 'true' : 'false'}
      aria-label="Expand Section"
      onClick={() => set(!show)}
      sx={{ border: 'none', bg: 'transparent' }}>
      <SVG
        viewBox="0 0 16 16"
        width="12"
        height="12"
        sx={{
          transition: 'transform ease .2s',
          transformOrigin: '50% 55%',
          transform: show ? 'rotate(180deg)' : null,
        }}>
        <path
          stroke="currentcolor"
          strokeWidth="2"
          fill="none"
          d="M14 6 L8 12 L2 6"
        />
      </SVG>
    </Button>
  )
}
