import React, { useRef, useState } from 'react'
import Lightbox from '@maker-ui/lightbox'
import { Spinner } from '@maker-ui/components'

const galleryData = [
  {
    src:
      'https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'Image',
    title: 'Image title',
    description: '',
  },
  { youtubeId: '4DTy32jdjP0' },
  { vimeoId: '172062096' },
]

const LightboxPage = () => {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <div>
      <Spinner type="scale" />
      <Spinner type="rotate" />
      <Spinner type="pulse" />
      <Spinner type="blocks" />
      <Spinner />
      <button ref={ref} onClick={e => set(true)}>
        Focus Ref
      </button>
      {/* Test with Clickable lightbox items */}
      <Lightbox focusRef={ref}>
        <Lightbox.Link
          title="Test"
          src="https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
          <div>Test!!</div>
        </Lightbox.Link>
        <Lightbox.Link title="Hilarious stuff" src="/reddit.jpg">
          <div>Test!!</div>
        </Lightbox.Link>
        <Lightbox.Link title="Youtube video" youtubeId="4DTy32jdjP0">
          <div>Test!!</div>
        </Lightbox.Link>
        <Lightbox.Link title="Vimeo video" vimeoId="172062096">
          Test!
        </Lightbox.Link>
      </Lightbox>
      {/* Test with data array */}
      <Lightbox show={show} toggle={set} data={galleryData} focusRef={ref} />
    </div>
  )
}

export default LightboxPage
