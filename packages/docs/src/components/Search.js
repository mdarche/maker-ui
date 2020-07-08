import React from 'react'
import { Flex } from 'maker-ui'

import { SearchIcon } from '../assets/icons'

const Search = () => {
  return (
    <Flex
      sx={{
        ml: 160,
        fontSize: 17,
        alignItems: 'center',
        span: { ml: 20, color: 'rgba(255, 255, 255, 0.71)' },
      }}>
      <SearchIcon />
      <span>Search docs...</span>
    </Flex>
  )
}

export default Search
