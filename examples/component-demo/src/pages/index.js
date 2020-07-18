import React from 'react'
import { Box } from 'maker-ui'

const IndexPage = () => {
  const boxRef = React.useRef(null)

  React.useEffect(() => {
    console.log('BoxRef is', boxRef)
  }, [boxRef])

  return (
    <>
      <h1>Component Showcase!</h1>
      <Box
        as="section"
        ref={boxRef}
        variant="testVariant"
        __sx={{
          fontSize: 30,
          variant: 'bigVariant',
        }}
        sx={{ color: 'red' }}>
        <div>
          Anoter title
          <h4>Subtitle</h4>
          <a href="/">Google</a>
        </div>
      </Box>
    </>
  )
}

export default IndexPage
