import React from 'react'
import { Box } from 'theme-ui'

export const Section = React.forwardRef(
  (
    { element = 'section', maxWidth = 'maxWidth_section', children, ...props },
    ref
  ) => {
    return (
      <Box ref={ref} as={element}>
        <Box {...props} __css={{ maxWidth, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    )
  }
)
