import * as React from 'react'

export interface LinkItem {
  id: string
  label: string
}

interface SkipLinkProps {
  links?: LinkItem[]
}

/**
 * Adds default skiplinks to the layout if enabled via `options` configuration.
 * By default, Skiplinks support #content, #footer, and #side-nav.
 *
 * Supply your own link array for extra control via the `Layout` component props.
 *
 * @internal
 */
export const Skiplinks = (props: SkipLinkProps) => {
  let linkMenu: LinkItem[] = []

  if (props.links) {
    linkMenu = props.links
  } else {
    linkMenu = [{ id: '#content', label: 'Skip to content' }]
  }

  return (
    <ul className="mkr-skiplinks">
      {linkMenu.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </ul>
  )
}

Skiplinks.displayName = 'Skiplinks'
