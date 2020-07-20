import React from 'react'
import { jsx, Box as TBox } from 'theme-ui'
import { ButtonProps, SVGProps, LinkProps, BoxProps } from '../types'

// TODO - change types based on "As" prop

export const Box = React.forwardRef<any, any>((props, ref) => {
  const { __sx, sx, ...rest } = props
  return <TBox ref={ref} sx={{ ...__sx, ...sx }} {...rest} />
})

/**
 * A `<Box />` component for quick access to css Flex properties.
 */

export const Flex = React.forwardRef<HTMLElement, BoxProps | any>(
  (props, ref) => <Box ref={ref} __sx={{ display: 'flex' }} {...props} />
)

/**
 * A `<Box />` component for inline SVGs.
 */

export const SVG = React.forwardRef<SVGAElement, SVGProps>((props, ref) => (
  <Box ref={ref} as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
))

/**
 * A `<Box />` component for Buttons.
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // @ts-ignore
  (props, ref) => <Box ref={ref} as="button" {...props} />
)

/**
 * A `<Box />` component for anchor tags.
 */

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  // @ts-ignore
  (props, ref) => <Box ref={ref} as="a" {...props} />
)

// /** @jsx jsx */
// import { jsx, Box as TBox } from 'theme-ui'
// import { forwardRef } from 'react'

// import { ButtonProps, SVGProps, LinkProps, BoxProps } from '../types'

// // TODO - change types based on "As" prop

// export const Box = forwardRef<any, any>(({ sx, __sx, ...props }, ref) => {
//   return <TBox ref={ref} sx={{ ...__sx, ...sx }} {...props} />
// })

// export const Flex = forwardRef<HTMLElement, BoxProps | any>((props, ref) => (
//   <div ref={ref} __sx={{ display: 'flex' }} {...props} />
// ))

// export const SVG = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
//   <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props} />
// ))

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   // @ts-ignore
//   (props, ref) => <button ref={ref} {...props} />
// )

// export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
//   <a ref={ref} {...props} />
// ))
