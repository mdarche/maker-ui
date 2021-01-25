/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { forwardRef } from 'react'
import * as CSS from 'csstype'

/** -----------------------   Div   ----------------------- */
/**
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
 * @see https://maker-ui.com/docs/primitives/#div
 */

export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <div ref={ref} {...props} />
))

Div.displayName = 'Div'

/** -----------------------   FLEX   ----------------------- */
/**
 * Alias for `Flex` component props that includes all
 * HTML div tag attributes.
 */

export interface FlexProps extends DivProps {
  inline?: boolean
  align?: CSS.Properties['alignItems']
  justify?: CSS.Properties['justifyContent']
  direction?: CSS.Properties['flexDirection']
  flex?: CSS.Properties['flex']
  wrap?: boolean
}

/**
 * A pre-styled `Div` for quick access to CSS Flex properties.
 *
 * @see https://maker-ui.com/docs/primitives/#flex
 */

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ inline, align, justify, direction, flex, wrap, css, ...props }, ref) => (
    <div
      ref={ref}
      css={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : undefined,
        flex,
        ...(css as object),
      }}
      {...props}
    />
  )
)

Flex.displayName = 'Flex'

/** -----------------------   GRID   ----------------------- */
/**
 * Alias for `Div` component props that includes all
 * HTML div tag attributes.
 */
export interface GridProps extends MakerProps, DivProps {
  columns?: CSS.Properties['gridTemplateColumns']
  rows?: CSS.Properties['gridTemplateRows']
  areas?: CSS.Properties['gridTemplateAreas']
  gap?: CSS.Properties['gap']
  center?: boolean
}

/**
 * A pre-styled `Div` for quick access to CSS Grid properties.
 *
 * @see https://maker-ui.com/docs/primitives/#grid
 */

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, rows, gap, areas, center, css, ...props }, ref) => (
    <div
      ref={ref}
      css={{
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridTemplateAreas: areas,
        gap,
        placeItems: center ? 'center' : undefined,
        ...(css as object),
      }}
      {...props}
    />
  )
)

Grid.displayName = 'Grid'

/** -----------------------   SPAN   ----------------------- */
/**
 * Alias for `Span` component props that includes all
 * HTML span tag attributes.
 */
export interface SpanProps
  extends MakerProps,
    React.HTMLAttributes<HTMLSpanElement> {}

/**
 * A theme-enabled `span` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#span
 */

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <span ref={ref} {...props} />
))

Span.displayName = 'Span'

/** -----------------------   OLIST   ----------------------- */
/**
 * Alias for `OList` component props that includes all
 * ordered list tag attributes.
 */
export interface OListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLOListElement> {}

/**
 * A theme-enabled `ol` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#olist
 */

export const OList = forwardRef<HTMLOListElement, OListProps>((props, ref) => (
  <ol ref={ref} {...props} />
))

OList.displayName = 'OList'

/** -----------------------   ULIST   ----------------------- */
/**
 * Alias for `UList` component props that includes all
 * unordered list tag attributes.
 */
export interface UListProps
  extends MakerProps,
    React.HTMLAttributes<HTMLUListElement> {}

/**
 * A theme-enabled `ul` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#ulist
 */

export const UList = forwardRef<HTMLUListElement, UListProps>((props, ref) => (
  <ul ref={ref} {...props} />
))

UList.displayName = 'UList'

/** -----------------------   LISTITEM   ----------------------- */
/**
 * Alias for `ListItem` component props that includes all
 * list item tag attributes.
 */
export interface ListItemProps
  extends MakerProps,
    React.HTMLAttributes<HTMLLIElement> {}

/**
 * A theme-enabled `li` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#listItem
 */

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => <li ref={ref} {...props} />
)

ListItem.displayName = 'ListItem'

/** -----------------------   SVG   ----------------------- */
/**
 * Alias for `SVG` component props that includes all
 * svg attributes.
 */
export interface SVGProps extends MakerProps, React.SVGAttributes<SVGElement> {}

/**
 * A theme-enabled `svg` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#svg
 */

export const SVG = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <svg ref={ref} xmlns="http://www.w3.org/2000/svg" {...props} />
))

SVG.displayName = 'SVG'

/** -----------------------   BUTTON   ----------------------- */
/**
 * Alias for `Button` component props that includes all
 * HTML button attributes.
 */
export interface ButtonProps
  extends MakerProps,
    React.HTMLAttributes<HTMLButtonElement> {}

/**
 * A theme-enabled `button` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#button
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
)

Button.displayName = 'Button'

/** -----------------------   LINK   ----------------------- */
/**
 * Alias for `Link` component props that includes all
 * anchor tag attributes.
 */
export interface LinkProps
  extends MakerProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * A theme-enabled `a` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#link
 */

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  )
)

Link.displayName = 'Link'

/** -----------------------   IMAGE   ----------------------- */
/**
 * Alias for `Image` component props that includes all
 * image tag attributes.
 */
export interface ImageProps
  extends MakerProps,
    React.AnchorHTMLAttributes<HTMLImageElement> {}

/**
 * A theme-enabled `img` tag.
 *
 * @see https://maker-ui.com/docs/primitives/#image
 */

export const Image = forwardRef<HTMLImageElement, any>(
  ({ src, alt, ...props }, ref) => (
    <img ref={ref} alt={alt} src={src} {...props} />
  )
)

Image.displayName = 'Image'
