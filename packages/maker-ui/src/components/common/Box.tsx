import React from 'react'
import { Box as TBox, Flex as TFlex } from 'theme-ui'

import { BoxProps, SVGProps, ButtonProps, LinkProps } from '../props'

/**
 * A Theme UI `<Box />` component that lets admins overwrite user
 * styles by placing the __css prop last.
 */
export const Box = (props: BoxProps) => <TBox {...props} __css={props.__css} />

/**
 * A Theme UI `<Flex />` component for handling flexbox layouts.
 */
export const Flex = ({ __css, ...props }: BoxProps) => (
  <TFlex {...props} __css={__css} />
)

/**
 * A Theme UI `<Box />` component for wrapping inline SVG components.
 */
export const SVG = (props: SVGProps) => (
  <TBox as="svg" xmlns="http://www.w3.org/2000/svg" {...props} />
)

/**
 * A Theme UI `<Box />` component for wrapping Buttons.
 */
export const Button = (props: ButtonProps) => <TBox as="button" {...props} />

/**
 * A Theme UI `<Box />` component for wrapping anchor tags.
 */
export const Link = (props: LinkProps) => <TBox as="a" {...props} />
