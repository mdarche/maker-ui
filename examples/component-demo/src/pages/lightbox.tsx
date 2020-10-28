import React, { useRef, useState } from 'react'
import { Lightbox, Spinner } from '@maker-ui/components'

const galleryData = [
  {
    src:
      'https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'Image',
    title: 'Image title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    youtubeId: '4DTy32jdjP0',
    title: 'title 2',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
  },
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
