import * as React from 'react'
import { Div } from 'maker-ui'

export const Fixed = () => {
  return (
    <Div css={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
      This component is fixed!
    </Div>
  )
}

Fixed.displayName = 'Fixed'
