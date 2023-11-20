'use client'
import { useRef, useState } from 'react'
import { Section } from 'maker-ui/layout'
import { Lightbox, type LightboxItem } from 'maker-ui/lightbox'

import CosmosImage from '@/images/cosmos.jpeg'
import Image from 'next/image'

const galleryData: LightboxItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1585127366945-8249097d15fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
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

export default function LightboxPage() {
  const [show, set] = useState(false)
  const ref = useRef(null)

  console.log('cosmos image is', CosmosImage)

  return (
    <Section css={{ '.test-btn': { color: 'red' } }}>
      <button ref={ref} onClick={(e) => set(true)}>
        Focus Ref
      </button>
      {/* Test with Clickable lightbox items */}
      <Lightbox focusRef={ref} settings={{ disableHideControls: true }}>
        <Lightbox.Link
          src={
            <Image
              fill
              src={CosmosImage}
              placeholder="blur"
              alt="cosmos"
              style={{ objectFit: 'cover' }}
            />
          }
          alt="cosmos">
          <div style={{ position: 'relative', height: 300 }}>
            <Image
              fill
              src={CosmosImage}
              placeholder="blur"
              alt="cosmos"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Lightbox.Link>
        <Lightbox.Link
          title="Hilarious stuff"
          src="https://picsum.photos/id/214/2000/1500">
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
      <button className="test-btn" onClick={() => set(true)}>
        Show lightbox 2
      </button>
      <Lightbox show={show} set={set} data={galleryData} focusRef={ref} />
    </Section>
  )
}
