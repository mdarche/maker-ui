import * as React from 'react'
import type { Options } from '@/types'

interface SkipLinkProps {
  links?: Options['skiplinks']
}

/**
 * Adds default skiplinks to the layout if enabled via `options` configuration.
 * By default, Skiplinks support #content, #footer, and #side-nav.
 *
 * Supply your own link array for extra control via the `Layout` component props.
 *
 * @internal
 */
export const Skiplinks = ({ links }: SkipLinkProps) => {
  let linkMenu: Options['skiplinks'] = []

  if (Array.isArray(links)) {
    linkMenu = links
  } else {
    linkMenu = [{ id: '#content', label: 'Skip to content' }]
  }

  return links === false ? null : (
    <ul className="mkui-skiplinks">
      {linkMenu.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </ul>
  )
}

Skiplinks.displayName = 'Skiplinks'
