import * as React from 'react'
import { generateId, cn } from '@maker-ui/utils'
import { useScrollPosition } from '@maker-ui/hooks'
import { Style, type ResponsiveCSS, type Breakpoints } from '@maker-ui/style'

interface MenuItem {
  id: string
  text: string
  level: number
  offset: number
}

export interface PageContentsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  breakpoints?: Breakpoints
  css?: ResponsiveCSS
  /** The application's current pathname, supplied via router hook or parent component.
   * This value ensures the DOM scanning effect reruns on each page load.
   */
  pathname?: string
  /** A string title or custom React Element that sits above the ToC links
   * @default "Content"
   */
  title?: string | React.ReactElement
  /** An array of all heading tags that the component should include as navigation links
   * @default ["h2", "h3", "h4"]
   */
  headings?: ('h2' | 'h3' | 'h4' | 'h5' | 'h6')[] | 'all'
  /** An optional psuedo marker that indicates the heading that's currently in the viewport. */
  marker?: 'before' | 'after'
  /** If true, links will be indented according to the heading tag
   * @default true
   */
  indent?: boolean
  /** A number (in pixels) that sets the indent padding for each nested heading.
   * @default 10
   */
  indentSize?: number
  /** The color of an active link when its corresponding heading is in the viewport */
  activeColor?: string | string[]
  /** Responsive CSS styles that will be applied to the marker pseudo styles if
   * using the `marker` prop. */
  pseudoCss?: ResponsiveCSS
  /** When true, the window will animate the scroll to each section.
   * @remark This is a global `scroll-behavior` style rule that is applied to the document body.
   * Use with caution and ensure it doesn't break your page transitions.
   * @default false
   */
  smoothScroll?: boolean
  /** If true, the ToC component will used sticky positioning and remain visible as users scroll
   * the main page content.
   * @default true
   */
  sticky?: boolean
  /** If true, the ToC component will be hidden on mobile according to your breakpoints array
   * or a custom defined `breakpoints` prop
   * @default true
   */
  hideOnMobile?: boolean
  /** An optional component that will sit below the heading navigation list. */
  footerComponent?: React.ReactElement
}

/**
 * Utility component to remove any leading or trailing HTML tags
 * @param text a string that may include HTML tags
 * @return a sanitized version of the string
 */
function sanitize(text: string) {
  return text.split('<').find((i) => !i.startsWith('<'))
}

/**
 * The `TableofContents` component queries the DOM for all heading tags that
 * have an ID. It then creates an indented / scroll activated list of heading links.
 *
 * @link https://maker-ui.com/docs/elements/tableofcontents
 */

export const PageContents = ({
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
  breakpoints,
  pathname = '/',
  footerComponent,
}: PageContentsProps) => {
  const [styleId] = React.useState(generateId())
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
    const selectors = activeHeadings.map((h) => `main ${h}`).join(', ')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
            const offsets = menuItems.map((i) => i.offset)
            const closest = offsets.reduce((a, b) => {
              return Math.abs(b - currPos) < Math.abs(a - currPos) ? b : a
            })
            return setActiveNode(
              menuItems.findIndex((i) => i.offset === closest)
            )
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
    <>
      <div className={cn(['mkui-contents', styleId, className])}>
        <div>{title}</div>
        <ul className="mkui-contents-list">
          {menuItems.length
            ? menuItems.map(({ id, text, level }: MenuItem, index) => (
                <li
                  key={`${id}-${index}`}
                  className={`level-${level}`}
                  style={{
                    paddingLeft: indent ? indentSize * level : undefined,
                  }}>
                  <a
                    className={activeNode === index ? 'active' : undefined}
                    onClick={() => setActiveNode(index)}
                    href={`#${id}`}>
                    {text}
                  </a>
                </li>
              ))
            : null}
        </ul>
        {footerComponent}
      </div>
      <Style
        root={styleId}
        breakpoints={breakpoints}
        css={{
          display: hideOnMobile ? ['none', 'block'] : 'block',
          position: sticky ? 'sticky' : undefined,
          top: sticky ? 0 : undefined,
          ...(css as object),
          '.mkui-contents-list': {
            padding: 0,
            listStyle: 'none',
          },
          a: { position: 'relative' },
          'a.active, a:hover': { color: activeColor || undefined },
          'a.active': marker && {
            ':before': {
              content: '""',
              position: 'absolute',
              height: '100%',
              top: 0,
              right: marker === 'after' ? 0 : undefined,
              borderLeft: marker === 'before' ? `2px solid` : undefined,
              borderRight: marker === 'after' ? `2px solid` : undefined,
              ...(pseudoCss as object),
            },
          },
        }}
      />
    </>
  )
}

PageContents.displayName = 'PageContents'

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
