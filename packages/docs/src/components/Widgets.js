import React from 'react'
import { Flex, Button } from 'maker-ui'
import { NewTabIcon, PaintIcon } from '../assets/icons'

export default () => (
  <Flex sx={{ alignItems: 'center' }}>
    <Flex
      as="a"
      href="https://github.com/mdarche/maker-ui"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ fontSize: '16px', alignItems: 'center' }}>
      Github
      <NewTabIcon
        sx={{ ml: '10px', height: '14px', fill: '#fff', opacity: 0.4 }}
      />
    </Flex>

    <Flex>
      <PaintIcon />
    </Flex>
  </Flex>
)
