import React from 'react'
import { Box } from 'theme-ui'

export const Section = React.forwardRef(
  (
    { maxWidth = 'maxWidth_section', bg, background, children, ...props },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        as={props.as || 'section'}
        bg={bg}
        sx={{ background, width: '100%' }}>
        <Box {...props} __css={{ maxWidth, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    )
  }
)
