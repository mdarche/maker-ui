import React from 'react'
import { Flex, Box } from 'theme-ui'

const Footer = React.forwardRef(
  (
    {
      bg = 'bg_footer',
      maxWidth = 'maxWidth_footer',
      variant = 'footer',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        as="footer"
        id="footer"
        role="contentinfo"
        variant={variant}
        bg={bg}
        {...props}>
        <Flex
          __css={{
            maxWidth,
            mx: 'auto',
          }}>
          {children}
        </Flex>
      </Box>
    )
  }
)

export default Footer
