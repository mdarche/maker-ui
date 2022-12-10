import * as React from 'react'

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string
  maxWidth?: string
  container?: boolean
}

/**
 * The `Section` component creates new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @link https://maker-ui.com/docs/layout/section
 */
export const Section = ({
  id,
  className,
  maxWidth = 'var(--max-width-section)',
  background,
  color,
  container = true,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      id={id}
      className={className}
      style={background ? { background } : undefined}>
      {container ? (
        <div
          className="container"
          style={maxWidth ? { maxWidth } : undefined}
          {...props}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

Section.displayName = 'Section'
