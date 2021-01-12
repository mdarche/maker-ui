/** @jsx jsx */
import { jsx } from '@emotion/react'
import { forwardRef } from 'react'

import { useMediaQuery } from '../hooks/useMediaQuery'

import { MakerProps, ResponsiveString, ResponsiveScale } from '../types'

/** -----------------------   DIV   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 *
 */
export interface DivProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {}

/**
 * The basic theme-enabled building block for Maker UI.
 *
 * @see https://maker-ui.com/docs/primitives/#div
 */

export const Div = forwardRef<HTMLDivElement, DivProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()

    return (
      <div ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

Div.displayName = 'Div'

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
 * @see https://maker-ui.com/docs/primitives/#flex
 */

export const Flex = forwardRef<HTMLDivElement, any>(
  (
    {
      inline,
      align,
      justify,
      direction,
      flex,
      wrap,
      css,
      breakpoints,
      ...props
    },
    ref
  ) => {
    const { parseStyles } = useMediaQuery()
    return (
      <div
        ref={ref}
        css={{
          display: inline ? 'inline-flex' : 'flex',
          alignItems: align,
          justifyContent: justify,
          flexDirection: direction,
          flexWrap: wrap && 'wrap',
          flex,
          ...parseStyles(css, breakpoints),
        }}
        {...props}
      />
    )
  }
)

Flex.displayName = 'Flex'

/** -----------------------   GRID   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface GridProps extends MakerProps, DivProps {
  columns?: any
  rows?: any
  gap?: any
  areas?: any
  columnGap?: any
  rowGap?: any
  center?: any
}

/**
 * A pre-styled `Div` for quick access to CSS Grid properties.
 *
 * @see https://maker-ui.com/docs/primitives/#grid
 */

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      rows,
      gap,
      areas,
      columnGap,
      rowGap,
      center,
      css,
      breakpoints,
      ...props
    },
    ref
  ) => {
    const { parseStyles } = useMediaQuery()
    return (
      <div
        ref={ref}
        css={{
          display: 'grid',
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
          gridTemplateAreas: areas,
          gridGap: gap,
          columnGap: columnGap,
          rowGap: rowGap || gap,
          placeItems: center && 'center',
          ...parseStyles(css, breakpoints),
        }}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

/** -----------------------   SPAN   -----------------------
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface SpanProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'css'> {}

/**
 * A theme-enabled `span` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#span
 */

export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <span ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

Span.displayName = 'Span'

/** -----------------------   OLIST   -----------------------
 * Alias for `OList` component props that includes all
 * ordered list tag attributes.
 */
export interface OListProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLOListElement>, 'css'> {}

/**
 * A theme-enabled `ol` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#olist
 */

export const OList = forwardRef<HTMLOListElement, OListProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <ol ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

OList.displayName = 'OList'

/** -----------------------   ULIST   -----------------------
 * Alias for `UList` component props that includes all
 * unordered list tag attributes.
 */
export interface UListProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLUListElement>, 'css'> {}

/**
 * A theme-enabled `ul` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#ulist
 */

export const UList = forwardRef<HTMLUListElement, UListProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <ul ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

UList.displayName = 'UList'

/** -----------------------   LISTITEM   -----------------------
 * Alias for `ListItem` component props that includes all
 * list item tag attributes.
 */
export interface ListItemProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'css'> {}

/**
 * A theme-enabled `li` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#listItem
 */

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <li ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

ListItem.displayName = 'ListItem'

/** -----------------------   SVG   -----------------------
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps
  extends MakerProps,
    Omit<React.SVGAttributes<SVGElement>, 'css'> {}

/**
 * A theme-enabled `svg` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#svg
 */

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        css={{ ...parseStyles(css, breakpoints) }}
        {...props}
      />
    )
  }
)

SVG.displayName = 'SVG'

/** -----------------------   BUTTON   -----------------------
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, 'css'> {}

/**
 * A theme-enabled `button` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#button
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ css, breakpoints, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <button ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props} />
    )
  }
)

Button.displayName = 'Button'

/** -----------------------   LINK   -----------------------
 * Alias for `Link` component props that includes all
 * anchor tag attributes.
 */
export interface LinkProps
  extends MakerProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'css'> {}

/**
 * A theme-enabled `a` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#link
 */

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ css, breakpoints, children, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <a ref={ref} css={{ ...parseStyles(css, breakpoints) }} {...props}>
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

/** -----------------------   IMAGE   -----------------------
 * Alias for `Image` component props that includes all
 * image tag attributes.
 */
export interface ImageProps
  extends MakerProps,
    Omit<React.AnchorHTMLAttributes<HTMLImageElement>, 'css'> {}

/**
 * A theme-enabled `img` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#image
 */

export const Image = forwardRef<HTMLImageElement, any>(
  ({ src, alt, css, breakpoints, children, ...props }, ref) => {
    const { parseStyles } = useMediaQuery()
    return (
      <img
        ref={ref}
        alt={alt}
        src={src}
        css={{ ...parseStyles(css, breakpoints) }}
        {...props}
      />
    )
  }
)

Image.displayName = 'Image'
