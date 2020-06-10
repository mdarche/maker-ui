import React from 'react'
import { Box as _Box, Flex as _Flex } from 'theme-ui'

import { BoxProps, ButtonProps, SVGProps, LinkProps } from '../props'

/**
 *  Aliases for Theme UI primitives
 *
 * @remark In case of future breaking updates, it's easier to address
 * in one place instead of throughout the entire code base.
 *
 * @TODO replace props with `@types/theme-ui` and `@types/theme-ui__components`
 * types when stable.
 */

/**
 * A Theme UI `<Box />` component that ensures admin styles are applied last.
 */
export const Box = (props: BoxProps) => <_Box {...props} __css={props.__css} />

/**
 * A Theme UI `<Flex />` component for handling flexbox layouts.
 */
export const Flex = (props: BoxProps) => (
  <_Flex {...props} __css={props.__css} />
)

/**
 * A Theme UI `<Box />` component for wrapping inline SVG components.
 */
export const SVG = (props: SVGProps) => (
  <_Box as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
)

/**
 * A Theme UI `<Box />` component for wrapping Buttons.
 */
export const Button = (props: ButtonProps) => <_Box as="button" {...props} />

/**
 * A Theme UI `<Box />` component for wrapping anchor tags.
 */
export const Link = (props: LinkProps) => <_Box as="a" {...props} />
