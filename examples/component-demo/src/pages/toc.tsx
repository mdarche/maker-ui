import * as React from 'react'
import { Grid, Div } from 'maker-ui'
import { TableofContents } from '@maker-ui/components'

const TocPage = () => {
  return (
    <Grid columns={['1fr 1fr']}>
      <div>
        <Div sx={{ height: 400 }}>
          <h2 id="section1">Title 1</h2>
        </Div>
        <Div sx={{ height: 400 }}>
          <h4 id="section10">Title 10</h4>
        </Div>
        <Div sx={{ height: 400 }}>
          <h3 id="section12">Title 10</h3>
        </Div>
        <Div sx={{ height: 600 }}>
          <h2 id="section2">Title 2</h2>
        </Div>
        <Div sx={{ height: 800 }}>
          <h2 id="section3">Title 3</h2>
        </Div>
      </div>
      <div>
        <TableofContents
          title="On this page"
          activeColor="blue"
          marker="before"
          sx={{
            display: ['none', 'block'],
            position: 'sticky',
            top: 80,
            ul: {
              lineHeight: 2,
              borderLeft: '1px solid gainsboro',
            },
            a: {
              padding: '20px 5px',
              color: '#555',
            },
          }}
        />
      </div>
    </Grid>
  )
}

export default TocPage
