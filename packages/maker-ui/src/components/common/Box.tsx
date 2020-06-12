import React from 'react'
import { Box, Flex } from 'theme-ui'

import { ButtonProps, SVGProps, LinkProps } from '../props'

/**
 *  Aliases for Theme UI primitives
 *
 * @remark In case of future breaking updates, it's easier to address
 * in one place instead of throughout the entire code base.
 *
 * @TODO replace props with `@types/theme-ui` and `@types/theme-ui__components`
 * when stable.
 */

/**
 * A Theme UI `<Box />` component for wrapping inline SVG components.
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

export { Box, Flex }
