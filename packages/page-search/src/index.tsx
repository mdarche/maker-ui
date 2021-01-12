import React, { useState, useRef, useEffect } from 'react'
import Mark from 'mark.js'
import { Flex, DivProps } from 'maker-ui'

export interface SearchProps extends DivProps {
  searchId?: string
  controls?: boolean
  sticky?: boolean
  offsetTop?: number
}

/**
 * The `PageSearch`component scans all HTML innerText inside the provided ID
 * selector and highlights all text that matches the search query.
 *
 * NOTE: searching occurs on the rendered DOM itself
 * @todo add extra class to marks that are the current focus of the prev/next buttons
 *
 * @see https://maker-ui.com/docs/components/page-search
 */

const PageSearch = ({
  searchId = 'content',
  controls = true,
  sticky = false,
  offsetTop = 50,
  sx,
  ...props
}: SearchProps) => {
  const inputRef = useRef(null)
  const [search, setSearch] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [results, setResults] = useState<NodeListOf<Element> | any>([])

  useEffect(() => {
    const content = document.querySelector(`#${searchId}`)
    const instance = new Mark(content)

    instance.unmark({
      done: () => {
        instance.mark(search, { className: 'search-mark' })
        setResults(document.querySelectorAll('.search-mark'))
        setIndex(0)
      },
    })
  }, [search, searchId, setResults, setIndex])

  function jumpTo() {
    const current = results[index]
    const position = current.offsetTop - offsetTop
    document.querySelectorAll('.search-mark').forEach(e => {
      e.classList.remove('current-mark')
    })
    current.classList.add('current-mark')
    window.scrollTo(0, position)
  }

  const clear = e => {
    setSearch('')
    inputRef.current.focus()
  }

  const prev = e => {
    if (index === 0) {
      setIndex(results.length - 1)
    } else {
      setIndex(index - 1)
    }
    jumpTo()
  }

  const next = e => {
    if (index === results.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
    jumpTo()
  }

  return (
    <Flex
      sx={{
        alignItems: 'stretch',
        position: sticky ? 'sticky' : 'relative',
        top: 0,
        ...sx,
      }}
      {...props}>
      <form role="search" aria-label="On this page">
        <input
          ref={inputRef}
          type="search"
          name="search"
          placeholder="Search this page..."
          value={search}
          onChange={e => setSearch(e.target.value)}></input>
      </form>
      {controls && (
        <>
          <button
            title="Previous result"
            aria-label="Previous result"
            onClick={results.length ? prev : null}>
            Prev
          </button>
          <button
            title="Next result"
            aria-label="Next result"
            onClick={results.length ? next : null}>
            Next
          </button>
        </>
      )}
      <button title="Clear" aria-label="Clear search" onClick={clear}>
        Clear
      </button>
    </Flex>
  )
}

export default PageSearch
