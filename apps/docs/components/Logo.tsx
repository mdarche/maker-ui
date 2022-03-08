import { random } from '@maker-ui/elements'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

interface LogoProps {
  path: string
}

const logoShapes = [
  'sidebar_left',
  'sidebar_right',
  'sidebars',
  'content',
  'navless_left',
  'navless_right',
] as const

export const Logo = ({ path }: LogoProps) => {
  const [shape, setShape] = useState<typeof logoShapes[number]>('sidebars')
  const [firstRender, setFirstRender] = useState(true)
  const variants = logoShapes.filter((k) => k !== shape)

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      return
    }
    setShape(random(variants))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  useEffect(() => {
    const selectors = ['nav', 'right', 'left', 'body']

    selectors.forEach((s) => {
      gsap.to(`#l-${s}`, {
        duration: 0.4,
        morphSVG: pathData[shape][s],
      })
    })
  }, [shape])

  return (
    <div className="flex align-center">
      <svg
        width="70"
        height="76"
        viewBox="0 0 106 76"
        xmlns="http://www.w3.org/2000/svg">
        <path id="l-nav" fill="#3B67BC" d={pathData['sidebars'].nav} />
        <path id="l-left" fill="#C7DAFF" d={pathData['sidebars'].left} />
        <path id="l-right" fill="#C7DAFF" d={pathData['sidebars'].right} />
        <path id="l-body" fill="#729BED" d={pathData['sidebars'].body} />
      </svg>
      Maker UI
    </div>
  )
}

const pathData = {
  sidebars: {
    nav: 'M106,0 C106,4.66667 106,9.33333 106,14 70.66667,14 35.33333,14 0,14 0,9.33333 0,4.66667 0,0 35.33333,0 70.66667,0 106,0 z',
    left: 'M21,23 C21,40.66667 21,58.33333 21,76 14,76 7,76 0,76 0,58.33333 0,40.66667 0,23 7,23 14,23 21,23 z',
    right:
      'M106,23 C106,40.66667 106,58.33333 106,76 99,76 92,76 85,76 85,58.33333 85,40.66667 85,23 92,23 99,23 106,23 z',
    body: 'M75,23 C75,40.66667 75,58.33333 75,76 60.33333,76 45.66667,76 31,76 31,58.33333 31,40.66667 31,23 45.66667,23 60.33333,23 75,23 z',
  },
  sidebar_left: {
    nav: 'M106 0 C106 4.66 106 9.33 106 14 70.66 14 35.33 14 0 14 0 9.33 0 4.66 0 0 35.33 0 70.66 0 106 0',
    left: 'M29,23 C29,40.66667 29,58.33333 29,76 19.33333,76 9.66667,76 0,76 0,58.33333 0,40.66667 0,23 9.66667,23 19.33333,23 29,23 z',
    right:
      'M0,106 C0,123.66667 0,141.33333 0,159 0,159 0,159 0,159 0,141.33333 0,123.66667 0,106 0,106 0,106 0,106 z',
    body: 'M106,23 C106,40.66667 106,58.33333 106,76 83.66667,76 61.33333,76 39,76 39,58.33333 39,40.66667 39,23 61.33333,23 83.66667,23 106,23 z',
  },
  sidebar_right: {
    nav: 'M106 0 C106 4.66 106 9.33 106 14 70.66 14 35.33 14 0 14 0 9.33 0 4.66 0 0 35.33 0 70.66 0 106 0',
    left: 'M0,23 C0,40.66667 0,58.33333 0,76 0,76 0,76 0,76 0,58.33333 0,40.66667 0,23 0,23 0,23 0,23 z',
    right:
      'M106,23 C106,40.66667 106,58.33333 106,76 96.33333,76 86.66667,76 77,76 77,58.33333 77,40.66667 77,23 86.66667,23 96.33333,23 106,23 z',
    body: 'M67,23 C67,40.66667 67,58.33333 67,76 44.66667,76 22.33333,76 0,76 0,58.33333 0,40.66667 0,23 22.33333,23 44.66667,23 67,23 z',
  },
  content: {
    nav: 'M106,0 C106,4.66667 106,9.33333 106,14 70.66667,14 35.33333,14 0,14 0,9.33333 0,4.66667 0,0 35.33333,0 70.66667,0 106,0 z',
    left: 'M0,23 C0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 z',
    right:
      'M0,23 C0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 z',
    body: 'M106,23 C106,40.66667 106,58.33333 106,76 70.66667,76 35.33333,76 0,76 0,58.33333 0,40.66667 0,23 35.33333,23 70.66667,23 106,23 z',
  },
  navless_left: {
    nav: 'M0,0 C0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 z',
    left: 'M0,23 C0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 z',
    right:
      'M106,0 C106,25.33333 106,50.66667 106,76 98.33333,76 90.66667,76 83,76 83,50.66667 83,25.33333 83,0 90.66667,0 98.33333,0 106,0 z',
    body: 'M72,0 C72,25.33333 72,50.66667 72,76 48,76 24,76 0,76 0,50.66667 0,25.33333 0,0 24,0 48,0 72,0 z',
  },
  navless_right: {
    nav: 'M0,0 C0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 z',
    left: 'M23,0 C23,25.33333 23,50.66667 23,76 15.33333,76 7.66667,76 0,76 0,50.66667 0,25.33333 0,0 7.66667,0 15.33333,0 23,0 z',
    right:
      'M0,23 C0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 0,23 z',
    body: 'M106,0 C106,25.33333 106,50.66667 106,76 82,76 58,76 34,76 34,50.66667 34,25.33333 34,0 58,0 82,0 106,0 z',
  },
}
