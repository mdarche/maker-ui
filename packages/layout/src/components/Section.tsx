/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef } from 'react'

interface SectionProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  _css?: MakerProps['css']
  maxWidth?: ResponsiveScale
  container?: boolean
}

/**
 * The `Section` component creates new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @link https://maker-ui.com/docs/layout/section
 */

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      maxWidth = 'var(--maxWidth_section)',
      background,
      color,
      container = true,
      id,
      className,
      _css,
      css,
      children,
      ...props
    },
    ref
  ) => {
    /**
     * If container is false, apply `css` prop to the root element
     */
    const rootCss = container
      ? _css
      : { ...(_css as object), ...(css as object) }
    return (
      <section
        ref={ref}
        id={id}
        className={className}
        css={{
          background,
          color,
          ...(rootCss as object),
        }}>
        {container ? (
          <div
            className="container"
            css={{
              maxWidth,
              ...(css as object),
            }}
            {...props}>
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = 'Section'
