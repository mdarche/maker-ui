import * as React from 'react'

export interface HeadingProps {
  children: string
}

export function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')
}

export const H2 = ({ children }: HeadingProps) => {
  const anchor = getAnchor(children)
  const link = `#${anchor}`
  return (
    <h2 id={anchor}>
      {children}
      <a href={link} className="anchor-link">
        #
      </a>
    </h2>
  )
}

export const H3 = ({ children }: HeadingProps) => {
  const anchor = getAnchor(children)
  const link = `#${anchor}`
  return (
    <h3 id={anchor}>
      {children}
      <a href={link} className="anchor-link">
        #
      </a>
    </h3>
  )
}

export const H4 = ({ children }: HeadingProps) => {
  const anchor = getAnchor(children)
  const link = `#${anchor}`
  return (
    <h4 id={anchor}>
      {children}
      <a href={link} className="anchor-link">
        #
      </a>
    </h4>
  )
}
