import React from 'react'
import { Box } from 'theme-ui'
import { SEO } from '@maker-ui/seo'
import { Carousel } from '@maker-ui/carousel'
import { Global, css } from '@emotion/core'

// Example 1 - Basic

const basicData = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const BasicSlide = ({ greeting, bg }) => (
  <Box
    sx={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
      p: {
        opacity: 0,
        animation: 'fadeInUp ease .6s forwards .8s',
      },
    }}>
    <p>{greeting}</p>
  </Box>
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
  <>
    <SEO title="Carousel" />
    <Global
      styles={css`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}
    />
    <Carousel
      data={basicData}
      template={<BasicSlide />}
      pageIndicator
      autoPlay
      progressBar
    />
    <Carousel
      data={imageData}
      template={<ImageSlide />}
      transition="fade"
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
  </>
)

export default CarouselPage
