import React, { useState, useRef } from 'react'
import { Lightbox } from '@elements-ui/components'

const LightboxPage = () => {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <div>
      <Lightbox
        id="modal-root"
        show={show}
        toggle={set}
        focusRef={ref}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        closeOnBlur>
        <a href="https://google.com">Google link</a>
      </Lightbox>
    </div>
  )
}

export default LightboxPage
