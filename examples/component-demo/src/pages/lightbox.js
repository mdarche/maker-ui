import React, { useState, useRef } from 'react'
import { Lightbox, BoxItem } from '@elements-ui/components'

const galleryData = [{ src: '', alt: '', title: '', description: '' }]

const LightboxPage = () => {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <div>
      <button ref={ref}>Focus Ref</button>
      <Lightbox id="modal-root" focusRef={ref} closeOnBlur>
        <BoxItem src="https://google.com">
          <div>Test!!</div>
        </BoxItem>
      </Lightbox>
    </div>
  )
}

export default LightboxPage
