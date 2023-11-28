'use client'

import { Section } from 'maker-ui/layout'
import Image from 'next/image'
import { Carousel } from 'maker-ui/carousel'
import 'maker-ui/carousel.css'

import CosmosImage from '@/images/cosmos.jpeg'
import { useState } from 'react'

export default function CarouselPage() {
  const [show, set] = useState(false)
  const colors = ['red', 'orange', 'purple', 'blue']

  return (
    <Carousel
      useArrowKeys
      overlay={
        <div
          className="flex flex-col align-center justify-center"
          style={{
            color: '#fff',
            position: 'absolute',
            left: 20,
            top: 100,
            width: 500,
            height: '50%',
            background: '#00000061',
          }}>
          <h2>Overlay</h2>
          <button onClick={() => set(!show)}>
            {show ? 'Active' : 'Inactive'}
          </button>
        </div>
      }
      // navPosition="left"
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
  )
}
