import React, { useRef } from 'react'
import { Lightbox, BoxItem } from '@maker-ui/components'

const galleryData = [{ src: '', alt: '', title: '', description: '' }]

const LightboxPage = () => {
  const ref = useRef(null)

  return (
    <div>
      <button ref={ref}>Focus Ref</button>
      <Lightbox id="modal-root" focusRef={ref} closeOnBlur>
        <BoxItem
          title="Test"
          src="https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem title="Hilarious stuff" src="/reddit.jpg">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem title="Youtube video" youtubeId="4DTy32jdjP0">
          <div>Test!!</div>
        </BoxItem>
        <BoxItem title="Vimeo video" vimeoId="172062096">
          Test!
        </BoxItem>
        {/* <BoxItem title="Youtube video" src="test.mp4">
          <div>Test!!</div>
        </BoxItem> */}
      </Lightbox>
    </div>
  )
}

export default LightboxPage
