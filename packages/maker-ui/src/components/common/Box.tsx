/** @jsx jsx */
import { forwardRef } from 'react'
import { jsx, Box as TBox, SxStyleProp } from 'theme-ui'

import { ButtonProps, SVGProps, LinkProps } from '../types'

export const Box = forwardRef<any, any>((props, ref) => {
  const { __sx, sx, ...rest } = props
  return <TBox ref={ref} sx={{ ...__sx, ...sx }} {...rest} />
})

/**
 * A `<Box />` component for quick access to css Flex properties.
 *
 * @todo - Align props with SX object properties (requires emotion & styled system)
 */

export const Flex = forwardRef<HTMLDivElement, any>(
  (
    { variant, inline, align, justify, direction, flex, wrap, sx, ...props },
    ref
  ) => (
    <div
      ref={ref}
      sx={{
        variant,
        display: inline ? 'inline-flex' : 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap && 'wrap',
        flex,
        ...sx,
      }}
      {...props}
    />
  )
)

export const SVG = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props} />
))

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
)

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <a ref={ref} {...props} />
))

// /**
//  * A `<Box />` component for inline SVGs.
//  */

// export const SVG = React.forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
//   <Box ref={ref} as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
// ))

// /**
//  * A `<Box />` component for Buttons.
//  */

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   // @ts-ignore
//   (props, ref) => <Box ref={ref} as="button" {...props} />
// )

// /**
//  * A `<Box />` component for anchor tags.
//  */

// export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
//   // @ts-ignore
//   (props, ref) => <Box ref={ref} as="a" {...props} />
// )

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
