import React from 'react'
import { Flex, Link } from 'maker-ui'
import { NewTabIcon, PaintIcon } from '../assets/icons'

export default () => (
  <Flex css={{ alignItems: 'center' }}>
    <Link
      href="https://github.com/mdarche/maker-ui"
      target="_blank"
      rel="noopener noreferrer"
      css={{ display: 'flex', fontSize: '16px', alignItems: 'center' }}>
      Github
      <NewTabIcon
        css={{ marginLeft: '10px', height: '14px', fill: '#fff', opacity: 0.4 }}
      />
    </Link>

    <Flex>
      <PaintIcon />
    </Flex>
  </Flex>
)
