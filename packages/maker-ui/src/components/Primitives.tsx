/** @jsx jsx */
import { forwardRef } from 'react'
import { jsx } from 'theme-ui'

import { MakerProps, ResponsiveString, ResponsiveScale } from './types'

/** -----------------------   DIV   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 *
 */
export interface DivProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The basic theme-enabled building block for Maker UI.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Div = forwardRef<HTMLDivElement, DivProps>(
  ({ variant, sx, ...props }, ref) => (
    <div ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   FLEX   -----------------------
 * Alias for `Flex` component props that includes all
 * HTML span tag attributes.
 */

export interface FlexProps extends DivProps {
  inline?: ResponsiveString
  align?: ResponsiveString
  justify?: ResponsiveString
  direction?: ResponsiveString
  flex?: ResponsiveScale
  wrap?: ResponsiveString
}

/**
 * A pre-styled `Div` for quick access to CSS Flex properties.
 *
 * @see https://maker-ui.com/docs/primitives
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

/** -----------------------   GRID   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface GridProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * A pre-styled `Div` for quick access to CSS Grid properties.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Grid = forwardRef<HTMLDivElement, any>(
  (
    {
      variant,
      columns,
      rows,
      gap,
      areas,
      columnGap,
      rowGap,
      center,
      sx,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      sx={{
        variant,
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridTemplateAreas: areas,
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

/** -----------------------   SPAN   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface SpanProps
  extends MakerProps,
    React.HTMLAttributes<HTMLSpanElement> {}

/**
 * A theme-enabled `span` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ variant, sx, ...props }, ref) => (
    <span ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   OLIST   -----------------------
 * Alias for `OList` component props that includes all
 * ordered list tag attributes.
 */
export interface OListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLOListElement> {}

/**
 * A theme-enabled `ol` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const OList = forwardRef<HTMLOListElement, OListProps>(
  ({ variant, sx, ...props }, ref) => (
    <ol ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   ULIST   -----------------------
 * Alias for `UList` component props that includes all
 * unordered list tag attributes.
 */
export interface UListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLUListElement> {}

/**
 * A theme-enabled `ul` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const UList = forwardRef<HTMLUListElement, UListProps>(
  ({ variant, sx, ...props }, ref) => (
    <ul ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   LISTITEM   -----------------------
 * Alias for `ListItem` component props that includes all
 * list item tag attributes.
 */
export interface ListItemProps
  extends MakerProps,
    React.HTMLAttributes<HTMLLIElement> {}

/**
 * A theme-enabled `li` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ variant, sx, ...props }, ref) => (
    <li ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   SVG   -----------------------
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps extends MakerProps, React.SVGAttributes<SVGElement> {}

/**
 * A theme-enabled `svg` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

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

/** -----------------------   BUTTON   -----------------------
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends MakerProps,
    React.HTMLAttributes<HTMLButtonElement> {}

/**
 * A theme-enabled `button` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, sx, ...props }, ref) => (
    <button ref={ref} sx={{ variant, ...sx }} {...props} />
  )
)

/** -----------------------   LINK   -----------------------
 * Alias for `Link` component props that includes all
 * anchor tag attributes.
 */
export interface LinkProps
  extends MakerProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * A theme-enabled `a` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, sx, children, ...props }, ref) => (
    <a ref={ref} sx={{ variant, ...sx }} {...props}>
      {children}
    </a>
  )
)

/** -----------------------   IMAGE   -----------------------
 * Alias for `Image` component props that includes all
 * image tag attributes.
 */
export interface ImageProps
  extends MakerProps,
    React.AnchorHTMLAttributes<HTMLImageElement> {}

/**
 * A theme-enabled `img` tag.
 *
 * @see https://maker-ui.com/docs/primitives
 */

export const Image = forwardRef<HTMLImageElement, any>(
  ({ variant, src, alt, sx, children, ...props }, ref) => (
    <img ref={ref} alt={alt} src={src} sx={{ variant, ...sx }} {...props} />
  )
)
