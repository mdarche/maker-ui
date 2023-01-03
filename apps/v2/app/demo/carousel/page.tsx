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
        navigation={(active, attrs) => (
          <button {...attrs}>{active ? 'y' : 'n'}</button>
        )}>
        {colors.map((c, i) => (
          <div
            key={c}
            className="flex align-center justify-center"
            style={{
              color: 'white',
              position: 'relative',
              height: 400,
              background: c,
            }}>
            {i === 1 || i === 3 ? (
              <Image
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
