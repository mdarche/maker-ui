import * as React from 'react'
import { SVG } from '@maker-ui/primitives'
import { SpinnerSVGProps } from './Spinner'

export const Blocks = ({
  size,
  colors: { primary, secondary, third },
  css,
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { x: '9', y: '9', fill: primary, b1: '-1.83', b2: '-1.33' },
    { x: '34.8', y: '56', fill: secondary, b1: '-1.16', b2: '-0.66' },
    { x: '56', y: '9', fill: third, b1: '-0.5', b2: '0' },
  ]

  const getAttributes = (x: boolean) => ({
    attributeName: x ? 'x' : 'y',
    dur: '2s',
    repeatCount: 'indefinite',
    keyTimes: '0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1',
    values: '9;56;56;56;56;9;9;9;9',
  })

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {points.map(({ x, y, fill, b1, b2 }, index) => (
        <rect
          key={index}
          x={x}
          y={y}
          rx="1"
          ry="1"
          style={{ fill, height: 35, width: 35 }}>
          <animate {...getAttributes(true)} begin={b1} />
          <animate {...getAttributes(false)} begin={b2} />
        </rect>
      ))}
    </SVG>
  )
}
