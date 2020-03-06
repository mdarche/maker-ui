import React from 'react'
import { Carousel } from '@elements-ui/carousel'

// Example 1 - Basic

const basicData = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const BasicSlide = ({ greeting, bg }) => (
  <div
    style={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}>
    {greeting}
  </div>
)

// Example 2 - Image

const imageData = [
  {
    url:
      'https://images.unsplash.com/photo-1583369756546-bf4b94fca936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    alt: 'Bubbles',
  },
  {
    url:
      'https://images.unsplash.com/flagged/photo-1583453514618-fe0b696df629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'Roses',
  },
  {
    url:
      'https://images.unsplash.com/photo-1583443644841-520e6e5709c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'Ice',
  },
]

const ImageSlide = ({ url, alt }) => (
  <img
    src={url}
    alt={alt}
    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
  />
)

const CarouselPage = () => (
  <React.Fragment>
    <Carousel
      data={basicData}
      template={<BasicSlide />}
      pageIndicator
      autoPlay
      hoverPause
      duration="6000"
    />
    <Carousel
      data={imageData}
      template={<ImageSlide />}
      sx={{
        my: 80,
        button: {
          px: 20,
          height: '100%',
          bg: 'rgba(0, 0, 0, 0.15)',
          transition: 'all ease .3s',
          '&:hover': {
            bg: 'rgba(0,0,0, .5)',
          },
          svg: { fill: '#fff' },
        },
      }}
    />
  </React.Fragment>
)

export default CarouselPage
