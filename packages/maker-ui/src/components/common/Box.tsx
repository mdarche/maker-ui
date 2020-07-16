import React from 'react'
import { jsx } from 'theme-ui'
import { ButtonProps, SVGProps, LinkProps, BasicBoxProps } from '../types'

// TODO - change types based on "As" prop

export const Box = ({
  as = 'div',
  sx = {},
  variant,
  base,
  __css,
  __sx,
  color,
  bg,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  b,
  bt,
  br,
  bl,
  bb,
  ...props
}: BasicBoxProps) => {
  // prettier-ignore
  const styles = {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
      color, bg,
      m, mt, mr, mb, ml, mx, my,
      p, pt, pr, pb, pl, px, py,
      border: b,
      borderTop: bt,
      borderRight: br,
      borderLeft: bl,
      borderBottom: bb,
      variant,
    ...__css,
    ...__sx,
    ...sx,
  }

  return jsx(as, {
    sx: styles,
    ...props,
  })
}

/**
 * A `<Box />` component for inline quick access to css Flex properties.
 */

export const Flex = (props: BasicBoxProps) => (
  <Box __sx={{ display: 'flex' }} {...props} />
)

/**
 * A `<Box />` component for inline SVGs.
 */

export const SVG = (props: SVGProps) => (
  <Box as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
)

/**
 * A `<Box />` component for Buttons.
 */

export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref
) {
  return <Box ref={ref} as="button" {...props} />
})

/**
 * A `<Box />` component for anchor tags.
 */

export const Link = (props: LinkProps) => <Box as="a" {...props} />
