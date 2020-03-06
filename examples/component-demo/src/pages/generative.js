import React, { useState } from 'react'
import { Box, Grid } from 'theme-ui'
import { Generate, GBox, GImage } from '@elements-ui/generative'

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

const Card = ({ text }) => (
  <Box
    sx={{
      textAlign: 'center',
      p: 40,
      fontSize: 5,
      bg: '#f7f7f7',
      border: '1px solid',
    }}>
    {text}
  </Box>
)

// Example 2 - Random components

const Comp1 = () => <Box sx={{ bg: '#ffd2a4' }}>Custom Component 1</Box>
const Comp2 = () => <Box sx={{ bg: '#d3d3ff' }}>Custom Component 2</Box>
const Comp3 = () => <Box sx={{ bg: '#aaffaa' }}>Custom Component 3</Box>

const componentData = [<Comp1 />, <Comp2 />, <Comp3 />]

// Example 3 - Random image

// Example 4 - Random styles

const GenerativePage = () => {
  return (
    <React.Fragment>
      <h2>Example 1</h2>
      <Grid gap="30px" columns={[2, 4]}>
        <Generate data={data}>
          <Card />
        </Generate>
      </Grid>
      <h2>Example 2</h2>
      <Grid
        gap="30px"
        columns={[1, 3]}
        sx={{ my: 80, textAlign: 'center', div: { p: 20 } }}>
        <Generate data={componentData} />
      </Grid>
    </React.Fragment>
  )
}

export default GenerativePage
