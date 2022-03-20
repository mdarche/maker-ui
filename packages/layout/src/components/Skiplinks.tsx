import * as React from 'react'

import { useLayout } from '../context/LayoutContext'
import { useOptions } from '../context/OptionContext'

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
  const { a11y } = useOptions()
  const [layout] = useLayout('content')
  let linkMenu: LinkItem[] = []

  if (props.links) {
    linkMenu = props.links
  } else {
    linkMenu = [{ id: '#content', label: 'Skip to content' }]
  }

  if (layout.includes('sidenav')) {
    linkMenu.splice(1, 0, {
      id: '#sidenav',
      label: 'Skip to side navigation',
    })
  }

  return a11y.skiplinks ? (
    <ul className="skiplinks">
      {linkMenu.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </ul>
  ) : null
}

Skiplinks.displayName = 'Skiplinks'
