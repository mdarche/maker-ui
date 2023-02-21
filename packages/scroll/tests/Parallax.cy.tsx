import * as React from 'react'
import { Parallax } from '@maker-ui/scroll'
import { Layout } from '@maker-ui/layout'

const Wrapper = ({ children }) => {
  return (
    <Layout options={{}}>
      <div style={{ paddingTop: 200, height: '200vh', color: '#fff' }}>
        {children}
      </div>
    </Layout>
  )
}

describe('Parallax', () => {
  it('renders with default props', () => {
    cy.mount(
      <Wrapper>
        <Parallax
          image={{
            src: 'https://picsum.photos/2000/1500',
            alt: 'random image',
          }}
          imageHeight={2000}>
          <h1>Page title</h1>
        </Parallax>
      </Wrapper>
    )
  })

  it('supports a Next Image with zero config', () => {
    cy.mount(
      <Wrapper>
        <Parallax
          // image={
          //   <Image
          //     // src={CosmoBG}
          //     alt="test-image"
          //     layout="fill"
          //     objectFit="cover"
          //   />
          // }
          imageHeight={2000}>
          <h1>Page title</h1>
        </Parallax>
      </Wrapper>
    )
  })
})
