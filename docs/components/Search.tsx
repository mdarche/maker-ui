import { Flex, Button } from 'maker-ui'

import { SearchIcon } from './Icons'

export const Search = () => {
  return (
    <Button
      css={{
        height: 50,
        width: '30%',
        background: 'gainsboro',
        display: 'flex',
      }}>
      <Flex>
        <SearchIcon />
        <span>Search docs</span>
      </Flex>
      <Flex>
        <span className="key-shortcut">⌘</span>
        <span className="key-shortcut">K</span>
      </Flex>
    </Button>
  )
}
