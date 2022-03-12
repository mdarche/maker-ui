import * as React from 'react'
import { mount } from '@cypress/react'
import { Parallax } from '@maker-ui/gsap'
import { Layout } from '@maker-ui/layout'
import Image from 'next/image'
import CosmoBG from './cosmos.jpeg'
import { Div } from '@maker-ui/primitives'

const Wrapper = ({ children }) => {
  return (
    <Layout options={{}}>
      <Div css={{ paddingTop: 200, height: '200vh', color: '#fff' }}>
        {children}
      </Div>
    </Layout>
  )
}

describe('Parallax', () => {
  it('renders with default props', () => {
    mount(
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
    mount(
      <Wrapper>
        <Parallax
          image={
            <Image
              src={CosmoBG}
              alt="test-image"
              layout="fill"
              objectFit="cover"
            />
          }
          imageHeight={2000}>
          <h1>Page title</h1>
        </Parallax>
      </Wrapper>
    )
  })
})
