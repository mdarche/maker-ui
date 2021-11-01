import * as React from 'react'
import { Div } from 'maker-ui'
import { Carousel } from '@maker-ui/elements'

// Example 1 - Basic
interface BasicSlideProps {
  greeting?: string
  bg?: string
}

const basicData: BasicSlideProps[] = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const BasicSlide = ({ greeting, bg }: BasicSlideProps) => (
  <Div
    css={{
      background: bg,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
    }}>
    <p>{greeting}</p>
  </Div>
)

// Example 2 - Image
// interface ImageSlideProps {
//   url?: string
//   alt?: string
// }
// const imageData: ImageSlideProps[] = [
//   {
//     url:
//       'https://images.unsplash.com/photo-1583369756546-bf4b94fca936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
//     alt: 'Bubbles',
//   },
//   {
//     url:
//       'https://images.unsplash.com/flagged/photo-1583453514618-fe0b696df629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//     alt: 'Roses',
//   },
//   {
//     url:
//       'https://images.unsplash.com/photo-1583443644841-520e6e5709c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//     alt: 'Ice',
//   },
// ]

// const ImageSlide = ({ url, alt }: ImageSlideProps) => (
//   <div
//     style={{
//       backgroundImage: `url(${url})`,
//       height: '100%',
//       width: '100%',
//       objectFit: 'cover',
//     }}
//   />
// )

const CarouselPage = () => (
  <Div>
    <Carousel
      data={basicData}
      template={<BasicSlide />}
      settings={{
        autoPlay: true,
        dotPosition: 'bottom',
        dotColorMuted: 'blue',
        // progressBar: true,
        transition: 'slide',
        // infiniteScroll: true,
        // arrow: <div>Cmoon!</div>,
        // arrow: {
        //   prev: <div>Prev</div>,
        //   next: <div>Next</div>,
        // },
      }}
    />
    {/* <Carousel
      data={imageData}
      template={<ImageSlide />}
      settings={{ autoPlay: false }}
    /> */}
  </Div>
)

export default CarouselPage
