import React from 'react'
import { Box } from 'theme-ui'

interface Props {
  children: React.ReactNode
  variant: string
  sx?: object
  bg?: string
  as?: string
  background?: string
  maxWidth?: string | any[]
}

const defaultProps = {
  maxWidth: 'maxWidth_section',
}

export const Section = React.forwardRef<HTMLElement, Props>(
  ({ maxWidth, bg, background, children, ...props }, ref) => {
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

Section.defaultProps = defaultProps
Section.displayName = 'Section'

// export default Section
