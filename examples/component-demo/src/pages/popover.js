import React, { useState, useRef } from 'react'
import { Popover as Dropdown } from '@maker-ui/components'

const TabsPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Dropdown
        anchor={buttonRef}
        origin={{ x: 'right', y: 'center' }}
        show={show}
        set={set}>
        Test!
      </Dropdown>
    </>
  )
}

export default TabsPage
