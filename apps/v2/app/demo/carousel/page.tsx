'use client'
import { Section } from 'maker-ui'
import Image from 'next/image'
import { Carousel } from 'maker-ui/carousel'
import 'maker-ui/carousel.css'

import CosmosImage from '@/public/cosmos.jpeg'

export default function CarouselPage() {
  const colors = ['red', 'orange', 'purple', 'blue']
  return (
    <Section style={{ maxWidth: '100vw', overflow: 'hidden' }}>
      <Carousel
        navPosition="top"
        // hideArrows
        // hidePagination
        // navigation={(active, attrs) => (
        //   <button {...attrs}>{active ? 'y' : 'n'}</button>
        // )}
      >
        {colors.map((c, i) => (
          <div
            key={c}
            className="flex align-center justify-center"
            style={{
              color: 'white',
              position: 'relative',
              height: 600,
              background: c,
            }}>
            {i === 1 || i === 3 ? (
              <Image
                priority
                src={CosmosImage}
                alt="carousel-image"
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              c
            )}
          </div>
        ))}
      </Carousel>
    </Section>
  )
}
