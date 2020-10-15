import React from 'react'
import { Div } from 'maker-ui'

const IndexPage = () => {
  return (
    <>
      <Div
        className="listing-meta"
        sx={{ textAlign: 'center', ml: '-65%', mr: 40 }}>
        <Div
          sx={{
            color: '#000',
            m: '30px 0 10px',
            textTransform: 'uppercase',
            fontFamily: 'heading',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 3,
          }}>
          Value
        </Div>
      </Div>
    </>
  )
}

export default IndexPage
