import React from 'react'
import { Carousel } from '@elements-ui/carousel'

const data = [
  { greeting: 'hello', bg: 'red' },
  { greeting: 'hi', bg: 'blue' },
  { greeting: 'howdy', bg: 'green' },
]

const Slide = ({ greeting, bg }) => (
  <div style={{ background: bg, height: '100%' }}>{greeting}</div>
)

const IndexPage = () => (
  <div>
    <Carousel data={data} template={<Slide />} pageIndicator hoverPause />
  </div>
)

export default IndexPage
