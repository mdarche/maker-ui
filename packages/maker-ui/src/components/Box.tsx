import React from 'react'
import { Box as TBox } from 'theme-ui'

import { BoxProps } from './props'

export const Box = ({ variant, as, sx, __css, ...props }: BoxProps) => (
  <TBox as={as} variant={variant} sx={sx} __css={__css} {...props} />
)
