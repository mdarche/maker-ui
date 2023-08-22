'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollPosition } from 'maker-ui/hooks'
import { usePathname } from 'next/navigation'

type Heading = {
  id: string
  text: string
  level: number
  offset: number
}

export const PageContents = () => {
  const anchor = window.location.hash.substring(1)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(anchor || null)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const pathname = usePathname()

  const headingRefs = useRef<(HTMLElement | null)[]>([])

  const findHeadings = () => {
    const allHeadings: Heading[] = []
    headingRefs.current = []

    const foundHeadings = Array.from(
      document.querySelectorAll<HTMLElement>('h2, h3')
    )

    foundHeadings.forEach((heading, index) => {
      const id =
        heading.id || heading.textContent?.replace(/\s/g, '-').toLowerCase()
      if (id) {
        heading.id = id
        headingRefs.current[index] = heading
        allHeadings.push({
          id,
          text: heading.textContent?.replace(/#/g, '') || '',
          level: heading.tagName === 'H2' ? 2 : 3,
          offset: heading.offsetTop,
        })
      }
    })

    setHeadings(allHeadings)
  }

  useEffect(() => {
    findHeadings()
  }, [pathname])

  useScrollPosition(
    ({ currPos, prevPos }) => {
      const isDownScroll = currPos > prevPos

      /**
       * Reset activeNode if scroll position is above first selector
       */
      if (activeNode !== undefined && currPos < headings[0]?.offset) {
        // window.history.pushState({}, '', pathname?.split('#')[0])
        return setActiveNode(null)
      }

      if (currPos >= headings[0].offset) {
        if (activeNode === null) {
          /**
           * Check if scroll is between first 2 heading nodes
           */
          if (headings.length > 1 && currPos <= headings[1]?.offset) {
            // window.history.pushState({}, '', `#${headings[0].id}`)
            return setActiveNode(0)
          } else {
            /**
             * Else find the nearest offset (expensive)
             * Used for fresh page loads if scroll is not at top of document
             */
            const offsets = headings.map((i) => i.offset)
            const closest = offsets.reduce((a, b) => {
              return Math.abs(b - currPos) < Math.abs(a - currPos) ? b : a
            })
            return setActiveNode(
              headings.findIndex((i) => i.offset === closest)
            )
          }
        }

        if (isDownScroll) {
          /**
           * If scrolling down, compare current node offset with the next offset
           */
          if (
            activeNode !== headings.length - 1 &&
            currPos >= headings[activeNode + 1].offset
          ) {
            // window.history.pushState({}, '', `#${headings[activeNode + 1].id}`)
            return setActiveNode(activeNode + 1)
          }
        } else {
          /**
           * If scrolling up, compare current node offset with previous offset
           */
          if (currPos <= headings[activeNode]?.offset) {
            // window.history.pushState({}, '', `#${headings[activeNode - 1].id}`)
            return setActiveNode(activeNode - 1)
          }
        }
      }
    },
    200,
    headings.length ? true : false
  )

  return (
    <div className="page-contents">
      <div className="page-contents-inner">
        <ul>
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              className={activeNode === index ? 'active' : ''}
              style={
                heading.level > 2
                  ? { marginLeft: (heading.level - 2) * 10 + 'px' }
                  : undefined
              }>
              <a href={`#${heading.id}`} onClick={() => setActiveNode(index)}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

PageContents.displayName = 'PageContents'
