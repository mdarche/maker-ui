import React, { useState, useRef } from 'react'
import { Popover } from '@maker-ui/components'

const TabsPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <>
      <button ref={buttonRef} style={{ height: 200 }} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Popover
        anchor={buttonRef}
        origin={{ x: 'right', y: 'center' }}
        show={show}
        set={set}>
        Test!
      </Popover>
    </>
  )
}

export default TabsPage
