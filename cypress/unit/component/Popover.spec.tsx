import * as React from 'react'
import { Popover } from '@maker-ui/components'
import { mount } from '@cypress/react'

describe('Popover component', () => {
  it('renders with default props', () => {
    mount(<Popover />)
  })
})
