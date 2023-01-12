'use client'
import { Section } from '@maker-ui/layout'
import Image from 'next/image'
import { Carousel } from '@/client'

import CosmosImage from '@/public/cosmos.jpeg'

export default function CarouselPage() {
  const colors = ['red', 'orange', 'purple', 'blue']
  return (
    <Section>
      <Carousel
        hideArrows
        // hidePagination
        navigation={(active, attrs) => (
          <button {...attrs}>{active ? 'y' : 'n'}</button>
        )}>
        {colors.map((c, i) => (
          <div
            key={c}
            className="flex align-center justify-center"
            style={{
              marginTop: 50,
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
