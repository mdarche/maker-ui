import { Parallax } from '@maker-ui/gsap'
import { Div } from 'maker-ui'
import Image from 'next/image'
import cosmosImage from '../../public/cosmos.jpeg'

export default function ParallaxPage() {
  return (
    <Div css={{ paddingBottom: '200vh', h1: { color: '#fff', fontSize: 40 } }}>
      <Parallax
        image={{
          src: 'https://picsum.photos/id/214/2000/1500',
          alt: 'random',
        }}
        overlay={{ background: 'rgba(0,0,0,0.85)' }}
        effect={{ start: '-60px top', y: -800 }}
        imagePosition="top top"
        textEffect={{ x: 400, opacity: 1 }}
        imageHeight={2000}
        css={{
          padding: '200px 20px',
          '.parallax-body': { opacity: 0 },
        }}>
        <h1>Image Object</h1>
      </Parallax>
      <Parallax
        image={
          <img src="https://picsum.photos/id/1016/2000/1500" alt="random" />
        }
        overlay={{ background: 'rgba(200, 59, 0, 0.66)' }}
        effect={{ start: '-200px center', end: 'bottom top', y: 300 }}
        css={{
          padding: '200px 20px',
          textAlign: 'center',
        }}>
        <h1>Basic Image Tag</h1>
      </Parallax>
      <Parallax
        image={
          <Image
            src={cosmosImage}
            alt="cosmos"
            layout="fill"
            objectFit="cover"
          />
        }
        overlay={{ background: 'rgba(0, 4, 200, 0.66)' }}
        effect={{ start: 'top bottom', end: 'bottom top', y: 300 }}
        css={{
          padding: '200px 20px',
          textAlign: 'center',
        }}>
        <h1>NextImage</h1>
      </Parallax>
    </Div>
  )
}
