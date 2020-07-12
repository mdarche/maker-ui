import React from 'react'
import { Box, Flex } from 'theme-ui'
import { ButtonProps, SVGProps, LinkProps } from '../types'

// import { jsx } from 'theme-ui'

// const Box = React.forwardRef<HTMLElement, BasicBoxProps>(
//   (
//     {
//       as = 'div',
//       sx = {},
//       variant,
//       admin,
//       color,
//       bg,
//       m,
//       mt,
//       mr,
//       mb,
//       ml,
//       mx,
//       my,
//       p,
//       pt,
//       pr,
//       pb,
//       pl,
//       px,
//       py,
//       b,
//       bt,
//       br,
//       bl,
//       bb,
//       ...props
//     },
//     ref
//   ) => {
//     // prettier-ignore
//     const styles = {
//     boxSizing: 'border-box',
//     margin: 0,
//     minWidth: 0,
//       color, bg,
//       m, mt, mr, mb, ml, mx, my,
//       p, pt, pr, pb, pl, px, py,
//       border: b,
//       borderTop: bt,
//       borderRight: br,
//       borderLeft: bl,
//       borderBottom: bb,
//     // ...admin?.sx,
//     variant,
//     ...sx,
//   }

//     return jsx(as, {
//       sx: styles,
//       ...ref,
//       ...props,
//     })
//   }
// )

/**
 *  Aliases for Theme UI primitives
 *
 * @remark In case of future breaking updates, it's easier to address
 * in one place instead of throughout the entire code base.
 *
 * @todo build custom Box and Flex implementations
 *
 */

export { Box, Flex }

/**
 * A Theme UI `<Box />` component for wrapping inline SVGs.
 */
export const SVG = (props: SVGProps) => (
  <Box as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
)

/**
 * A Theme UI `<Box />` component for wrapping Buttons.
 */
export const Button = (props: ButtonProps) => <Box as="button" {...props} />

/**
 * A Theme UI `<Box />` component for wrapping anchor tags.
 */
export const Link = (props: LinkProps) => <Box as="a" {...props} />
