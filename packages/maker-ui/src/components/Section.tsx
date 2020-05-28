import React from 'react'

import { Box } from './common'
import { MakerProps } from './props'

interface SectionProps extends MakerProps {
  background?: string
  maxWidth: string | any[]
}

const defaultProps = {
  maxWidth: 'maxWidth_section',
  label: 'Section',
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
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
