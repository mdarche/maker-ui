import React from 'react'

import { Box } from './common'
import { MakerProps, ResponsiveScale } from './types'

interface SectionProps extends MakerProps {
  background?: ResponsiveScale
  maxWidth?: ResponsiveScale
}

const defaultProps = {
  maxWidth: 'maxWidth_section',
  label: 'Section',
}

/**
 * Use the `Section` component to add new content sections that support full-width
 * backgrounds with custom max-width content.
 *
 * @see https://maker-ui.com/docs/section
 */

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
