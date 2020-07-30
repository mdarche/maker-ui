/** @jsx jsx */
import { forwardRef } from 'react'
import { jsx, Box as TBox } from 'theme-ui'

import {
  ButtonProps,
  SVGProps,
  LinkProps,
  UListProps,
  OListProps,
  ListItemProps,
  DivProps,
  SpanProps,
} from '../types'

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

export const Grid = forwardRef<HTMLDivElement, any>(
  (
    { variant, columns, rows, gap, columnGap, rowGap, center, sx, ...props },
    ref
  ) => (
    <div
      ref={ref}
      sx={{
        variant,
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridGap: gap,
        columnGap: columnGap,
        rowGap: rowGap,
        placeItems: center && 'center',
        ...sx,
      }}
      {...props}
    />
  )
)

export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <div ref={ref} {...props} />
))

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <span ref={ref} {...props} />
))

export const OList = forwardRef<HTMLOListElement, OListProps>((props, ref) => (
  <ol ref={ref} {...props} />
))

export const UList = forwardRef<HTMLUListElement, UListProps>((props, ref) => (
  <ul ref={ref} {...props} />
))

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => <li ref={ref} {...props} />
)

export const SVG = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props} />
))

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
)

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  )
)
