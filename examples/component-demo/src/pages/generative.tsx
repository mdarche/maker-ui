import * as React from 'react'
import { Flex, Div, Grid, Image } from 'maker-ui'
import {
  FadeBox,
  Generate,
  generateStyles,
  generateSrc,
} from '@maker-ui/components'

// Example 1 - Random grid items

const data = [
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' },
  { text: '5' },
  { text: '6' },
  { text: '7' },
  { text: '8' },
]

const Card = props => (
  <Div
    sx={{
      textAlign: 'center',
      p: 40,
      fontSize: 5,
      bg: '#f7f7f7',
      border: '1px solid',
    }}>
    {props?.text}
  </Div>
)

// Example 2 - Random components

const Component1 = () => <Div sx={{ bg: '#ffd2a4' }}>Custom Component 1</Div>
const Component2 = () => <Div sx={{ bg: '#d3d3ff' }}>Custom Component 2</Div>
const Component3 = () => <Div sx={{ bg: '#aaffaa' }}>Custom Component 3</Div>

const componentData = [<Component1 />, <Component2 />, <Component3 />]

// Example 3 - Random image

const imageData = [
  {
    src:
      'https://images.unsplash.com/photo-1583468323330-9032ad490fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
    alt: 'flower',
  },
  {
    src:
      'https://images.unsplash.com/photo-1583549323543-7ae855a78d6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'Food',
  },
  {
    src:
      'https://images.unsplash.com/photo-1583384991428-d3dca43177f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'dunes',
  },
]

// Example 4 - Random style object

const styles = {
  fontFamily: ['body', 'serif', 'monospace'],
  color: ['tomato', 'green', 'violet'],
  bg: ['#ffc4c4', '#cac4ff', '#c4fffa'],
  p: [30, 50, 120],
  fontSize: [18, 25, 36],
  borderRadius: [0, 10, 5],
}

const GenerativePage = () => {
  return (
    <React.Fragment>
      <h2>Example 1</h2>
      <Grid gap="30px" columns={['1fr 1fr', 'repeat(4, 1fr)']}>
        <Generate data={data}>
          <Card />
        </Generate>
      </Grid>
      <h2>Example 2</h2>
      <Grid
        gap="30px"
        columns={['1fr', 'repeat(3, 1fr)']}
        sx={{ my: 80, textAlign: 'center', div: { p: 20 } }}>
        <Generate data={componentData} />
      </Grid>
      <h2>Example 3</h2>
      <Image {...generateSrc(imageData)} />
      <FadeBox
        transition="fade-left"
        distance={100}
        sx={{ bg: 'gainsboro', my: 100 }}>
        Test
      </FadeBox>
      <h2>Example 4</h2>
      <Flex
        inline
        justify="center"
        sx={{
          ...generateStyles(styles, true),
        }}>
        My styles are randomly generated on each rerender
      </Flex>
      <Flex sx={{ height: 800 }} />
    </React.Fragment>
  )
}

export default GenerativePage
