/** @jsx jsx */
import { jsx } from 'theme-ui'

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
 * @remark You can supply your own link array for extra accessibility control.
 *
 * @internal only
 */

export const Skiplinks = (props: SkipLinkProps) => {
  const { layout, a11y } = useOptions()
  let linkMenu: LinkItem[] = []

  if (props.links) {
    linkMenu = props.links
  } else {
    linkMenu = [
      { id: '#content', label: 'Skip to content' },
      { id: '#footer', label: 'Skip to footer' },
    ]
  }

  if (layout.includes('sidenav')) {
    linkMenu.splice(1, 0, {
      id: '#side-nav',
      label: 'Skip to side navigation',
    })
  }

  return a11y.skiplinks ? (
    <ul
      className="skiplinks"
      sx={{
        listStyle: 'none',
        position: 'relative',
        zIndex: 1000,
        p: 0,
        m: 0,
        a: {
          bg: 'bg_header',
          display: 'block',
          position: 'absolute',
          fontFamily: 'body',
          left: -9999,
          p: '1em',
          '&:focus': {
            left: 0,
          },
        },
      }}>
      {linkMenu.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </ul>
  ) : null
}
