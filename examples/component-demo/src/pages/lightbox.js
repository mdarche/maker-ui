import React, { useRef } from 'react'
import { Lightbox } from '@maker-ui/lightbox'
import { Spinner } from '@maker-ui/components'

const galleryData = [{ src: '', alt: '', title: '', description: '' }]

const LightboxPage = () => {
  const ref = useRef(null)

  return (
    <div>
      <Spinner type="scale" />
      <Spinner type="rotate" />
      <Spinner type="pulse" />
      <Spinner type="blocks" />
      <Spinner />
      <button ref={ref}>Focus Ref</button>
      <Lightbox focusRef={ref} closeOnBlur>
        <Lightbox.Item
          title="Test"
          src="https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
          <div>Test!!</div>
        </Lightbox.Item>
        <Lightbox.Item title="Hilarious stuff" src="/reddit.jpg">
          <div>Test!!</div>
        </Lightbox.Item>
        <Lightbox.Item title="Youtube video" youtubeId="4DTy32jdjP0">
          <div>Test!!</div>
        </Lightbox.Item>
        <Lightbox.Item title="Vimeo video" vimeoId="172062096">
          Test!
        </Lightbox.Item>
      </Lightbox>
    </div>
  )
}

export default LightboxPage
