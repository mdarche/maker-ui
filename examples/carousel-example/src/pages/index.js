import React from 'react'
import { Carousel } from '@elements-ui/carousel'

const data = [
  { greeting: 'Hello!', bg: '#ff8787' },
  { greeting: 'Hola!', bg: '#aeaefe' },
  { greeting: 'Bonjour!', bg: '#aefec7' },
  { greeting: 'Ciao!', bg: '#e9a0e9' },
]

const Slide = ({ greeting, bg }) => (
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

const IndexPage = () => (
  <React.Fragment>
    <Carousel data={data} template={<Slide />} pageIndicator hoverPause pause />
  </React.Fragment>
)

export default IndexPage
