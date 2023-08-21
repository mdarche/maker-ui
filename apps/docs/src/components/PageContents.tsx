'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Heading = {
  id: string
  text: string
  level: number
}

export const PageContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const pathname = usePathname()

  const findHeadings = () => {
    const allHeadings: Heading[] = []
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('h2, h3')
    )

    headings.forEach((heading, index) => {
      const id =
        heading.id || heading.textContent?.replace(/\s/g, '-').toLowerCase()
      if (id) {
        heading.id = id
        allHeadings.push({
          id,
          text: heading.textContent?.replace(/#/g, '') || '',
          level: heading.tagName === 'H2' ? 2 : 3,
        })
      }
    })

    setHeadings(allHeadings)
  }

  const handleScroll = () => {
    const offset = window.scrollY + 1
    let currentId: string | null = null

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        if (element.offsetTop <= offset) {
          currentId = heading.id
        }
      }
    })

    setActiveId(currentId)
  }

  useEffect(() => {
    findHeadings()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className="page-contents">
      <div className="page-contents-inner">
        <ul>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.id === activeId ? 'active' : ''}
              style={
                heading.level > 2
                  ? { marginLeft: (heading.level - 2) * 10 + 'px' }
                  : undefined
              }>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

PageContents.displayName = 'PageContents'
