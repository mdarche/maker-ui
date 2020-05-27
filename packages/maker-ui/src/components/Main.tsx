import React from 'react'
import { Box } from 'theme-ui'

interface Props {
  children: React.ReactNode
  variant: string
  sx?: object
  bg?: string
}

const defaultProps = {
  variant: 'main',
}

const Main = React.forwardRef(
  ({ variant, ...props }: Props, ref: React.Ref<HTMLElement>) => (
    <Box
      ref={ref}
      as="main"
      id="content"
      role="main"
      variant={variant}
      {...props}
      __css={{ flex: 1 }}
    />
  )
)

Main.defaultProps = defaultProps

export default Main
