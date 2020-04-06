import React, { useState, useRef } from 'react'
import { Popover } from '@maker-ui/components'

const TabsPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <React.Fragment>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Popover target={buttonRef} position="right" show={show}>
        Test!
      </Popover>
    </React.Fragment>
  )
}

export default TabsPage
