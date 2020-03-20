import React, { useState, useRef, useEffect } from 'react'
import Mark from 'mark.js'
import { Box } from 'theme-ui'

const PageSearch = React.forwardRef(
  ({ searchId = '#content', ...props }, ref) => {
    const inputRef = useRef(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
      const markInstance = new Mark(document.querySelector(searchId))

      markInstance.unmark({
        done: () => {
          markInstance.mark(search)
        },
      })
    }, [search])

    const clear = e => {
      setSearch('')
      inputRef.current.focus()
    }

    return (
      <Box ref={ref} {...props}>
        <input
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}></input>
        <button>Prev</button>
        <button>Next</button>
        <button onClick={clear}>Clear</button>
      </Box>
    )
  }
)

export default PageSearch
