import * as React from 'react'
import {
  Div,
  ListItem,
  DivProps,
  useScrollPosition,
  MakerProps,
  mergeSelectors,
} from 'maker-ui'

interface MenuItem {
  id: string
  text: string
  level: number
  offset: number
}

interface ToCProps extends Omit<DivProps, 'title'> {
  title?: string | React.ReactElement
  headings?: ('h2' | 'h3' | 'h4' | 'h5' | 'h6')[] | 'all'
  indent?: boolean
  marker?: 'before' | 'after'
  indentSize?: number
  activeColor?: string | string[]
  pseudoCss?: MakerProps['css']
  smoothScroll?: boolean
  sticky?: boolean
  hideOnMobile?: boolean
  pathname?: string
  footerComponent?: React.ReactElement
}

/**
 * Utility component to remove any leading or trailing HTML tags
 */
function sanitize(text: string) {
  return text.split('<').find(i => !i.startsWith('<'))
}

/**
 * The `TableofContents` component queries the DOM for all heading tags that
 * have an ID. It then creates an indented / scroll activated list of heading links.
 *
 * @link https://maker-ui.com/docs/components/tableofcontents
 */

export const TableofContents = ({
  title = 'Contents',
  headings = ['h2', 'h3', 'h4'],
  activeColor,
  marker,
  indent = true,
  indentSize = 10,
  pseudoCss,
  smoothScroll = false,
  className,
  sticky = true,
  hideOnMobile = true,
  css,
  pathname,
  footerComponent,
}: ToCProps) => {
  const [menuItems, setMenu] = React.useState<MenuItem[]>([])
  const [activeNode, setActiveNode] = React.useState<number | null>(null)

  /**
   * Add smooth scroll to document if specified
   */
  React.useEffect(() => {
    const html = document.querySelector('html') as HTMLElement
    if (smoothScroll) {
      html.style.scrollBehavior = 'smooth'
    } else {
      html.style.removeProperty('scroll-behavior')
    }
  }, [smoothScroll])

  /**
   * Query DOM for applicable heading elements
   */
  React.useEffect(() => {
    const activeHeadings = headings !== 'all' ? headings : allHeadings
    const selectors = activeHeadings.map(h => `main ${h}`).join(', ')
    const nodes: HTMLElement[] = Array.from(
      document.querySelectorAll(selectors)
    )

    if (nodes.length) {
      const menu = nodes.reduce<any>(
        (filtered, { id, innerHTML, innerText, offsetTop, tagName }) => {
          if (id) {
            filtered.push({
              text: sanitize(
                !innerHTML.includes('<!--') ? innerHTML : innerText
              ),
              id,
              level: getLevel(tagName),
              offset: offsetTop,
            })
          }
          return filtered
        },
        []
      )
      setMenu(menu)
    } else {
      setMenu([])
    }
  }, [headings, pathname])

  // Handle Scroll position
  useScrollPosition(
    ({ currPos, prevPos }) => {
      const isDownScroll = currPos > prevPos

      /**
       * Reset activeNode if scroll position is above first selector
       */
      if (activeNode !== undefined && currPos < menuItems[0]?.offset) {
        window.history.pushState({}, '', pathname?.split('#')[0])
        return setActiveNode(null)
      }

      if (currPos >= menuItems[0].offset) {
        if (activeNode === null) {
          /**
           * Check if scroll is between first 2 heading nodes
           */
          if (menuItems.length > 1 && currPos <= menuItems[1]?.offset) {
            window.history.pushState({}, '', `#${menuItems[0].id}`)
            return setActiveNode(0)
          } else {
            /**
             * Else find the nearest offset (expensive)
             * Used for fresh page loads if scroll is not at top of document
             */
            const offsets = menuItems.map(i => i.offset)
            const closest = offsets.reduce((a, b) => {
              return Math.abs(b - currPos) < Math.abs(a - currPos) ? b : a
            })
            return setActiveNode(menuItems.findIndex(i => i.offset === closest))
          }
        }

        if (isDownScroll) {
          /**
           * If scrolling down, compare current node offset with the next offset
           */
          if (
            activeNode !== menuItems.length - 1 &&
            currPos >= menuItems[activeNode + 1].offset
          ) {
            window.history.pushState({}, '', `#${menuItems[activeNode + 1].id}`)
            return setActiveNode(activeNode + 1)
          }
        } else {
          /**
           * If scrolling up, compare current node offset with previous offset
           */
          if (currPos <= menuItems[activeNode]?.offset) {
            window.history.pushState({}, '', `#${menuItems[activeNode - 1].id}`)
            return setActiveNode(activeNode - 1)
          }
        }
      }
    },
    200,
    menuItems.length ? true : false
  )

  return (
    <Div
      className={mergeSelectors(['toc', className])}
      css={{
        display: hideOnMobile ? ['none', 'block'] : 'block',
        position: sticky ? 'sticky' : undefined,
        top: sticky ? 0 : undefined,
        ...(css as object),
        ul: {
          padding: 0,
          listStyle: 'none',
        },
      }}>
      <div>{title}</div>
      <ul className="toc-headings">
        {menuItems.length
          ? menuItems.map(({ id, text, level }: MenuItem, index) => (
              <ListItem
                key={index}
                className={`level-${level}`}
                css={{
                  paddingLeft: indent ? indentSize * level : undefined,
                  a: { position: 'relative' },
                  'a.active, a:hover': { color: activeColor || undefined },
                  'a.active': marker && {
                    ':before': {
                      content: '""',
                      position: 'absolute',
                      height: '100%',
                      top: 0,
                      left:
                        marker === 'before' && indent
                          ? 0 - indentSize * level
                          : marker === 'before'
                          ? 0
                          : undefined,
                      right: marker === 'after' ? 0 : undefined,
                      borderLeft: marker === 'before' ? `2px solid` : undefined,
                      borderRight: marker === 'after' ? `2px solid` : undefined,
                      ...(pseudoCss as object),
                    },
                  },
                }}>
                <a
                  className={activeNode === index ? 'active' : undefined}
                  onClick={() => setActiveNode(index)}
                  href={`#${id}`}>
                  {text}
                </a>
              </ListItem>
            ))
          : null}
      </ul>
      {footerComponent}
    </Div>
  )
}

TableofContents.displayName = 'TableofContents'

const allHeadings = ['h2', 'h3', 'h4', 'h5', 'h6']

function getLevel(lvl: string) {
  switch (lvl) {
    case 'H3':
      return 1
    case 'H4':
      return 2
    case 'H5':
      return 3
    case 'H6':
      return 4
    case 'H2':
    default:
      return 0
  }
}
