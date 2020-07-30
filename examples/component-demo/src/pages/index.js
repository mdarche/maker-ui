import React from 'react'
import { Div } from 'maker-ui'

const IndexPage = () => {
  const boxRef = React.useRef(null)

  React.useEffect(() => {
    console.log('BoxRef is', boxRef)
  }, [boxRef])

  return (
    <>
      <h1>Component Showcase!</h1>
      <Div
        ref={boxRef}
        sx={{
          variant: 'testVariant',
          fontSize: 50,
          // variant: 'bigVariant',
          color: 'red',
        }}>
        <div>
          Anoter title
          <h4>Subtitle</h4>
          <a href="/">Google</a>
        </div>
      </Div>
    </>
  )
}

export default IndexPage
