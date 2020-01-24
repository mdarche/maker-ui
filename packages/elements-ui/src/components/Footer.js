import React from 'react'
import { Flex, Box } from 'theme-ui'

export const Footer = React.forwardRef(
  (
    {
      bg = 'bg_footer',
      maxWidth = 'maxWidth_footer',
      sx,
      variant = 'footer',
      ...props
    },
    ref
  ) => {
    return (
      <Box
        as="footer"
        ref={ref}
        id="footer"
        role="contentinfo"
        tabIndex="-1"
        variant={variant}
        bg={bg}>
        <Flex
          {...props}
          sx={{
            maxWidth,
            mx: 'auto',
            ...sx,
          }}
        />
      </Box>
    )
  }
)
