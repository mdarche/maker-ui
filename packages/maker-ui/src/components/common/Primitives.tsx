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
 * A pre-styled div component for quick access to css Flex properties.
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
        rowGap: rowGap || gap,
        placeItems: center && 'center',
        ...sx,
      }}
      {...props}
    />
  )
)

export const Div = forwardRef<HTMLDivElement, DivProps>(
  ({ variant, sx, ...props }, ref) => (
    <div ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ variant, sx, ...props }, ref) => (
    <span ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const OList = forwardRef<HTMLOListElement, OListProps>(
  ({ variant, sx, ...props }, ref) => (
    <ol ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const UList = forwardRef<HTMLUListElement, UListProps>(
  ({ variant, sx, ...props }, ref) => (
    <ul ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ variant, sx, ...props }, ref) => (
    <li ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  ({ variant, sx, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      sx={{ variant, ...sx }}
      {...props}
    />
  )
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, sx, ...props }, ref) => (
    <button ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, sx, children, ...props }, ref) => (
    <a ref={ref} sx={{ variant, ...sx }} {...props}>
      {children}
    </a>
  )
)
