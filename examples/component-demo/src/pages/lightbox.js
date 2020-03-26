import React, { useRef } from 'react'
import { Lightbox, BoxItem } from '@elements-ui/components'

const galleryData = [{ src: '', alt: '', title: '', description: '' }]

const LightboxPage = () => {
  const ref = useRef(null)

  return (
    <div>
      <button ref={ref}>Focus Ref</button>
      <Lightbox id="modal-root" focusRef={ref} closeOnBlur>
        <BoxItem src="https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem src="https://youtube.com">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem src="https://facebook.com">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem src="https://linkedIn.com">
          <div>Test!!</div>
        </BoxItem>
      </Lightbox>
    </div>
  )
}

export default LightboxPage
