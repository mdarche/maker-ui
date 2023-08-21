import React, { createElement } from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 2 | 3
}

export const Heading = ({ level, children, ...props }: HeadingProps) => {
  const genId = (children as string).replace(/\s+/g, '-').toLowerCase()

  return createElement(
    `h${level}`,
    { id: genId, ...props },
    <a href={`#${genId}`}>
      {children}
      <span className="h-icon">#</span>
    </a>
  )
}
