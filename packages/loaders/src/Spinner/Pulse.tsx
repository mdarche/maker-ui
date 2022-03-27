import * as React from 'react'
import { SVG } from '@maker-ui/primitives'
import { SpinnerSVGProps } from './Spinner'

export const Pulse = ({
  size,
  colors: { primary, secondary },
  css,
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { r: '24', begin: '-0.8', color: primary },
    { r: '39.6', begin: '0', color: secondary },
  ]

  const getAttributes = (r: boolean) => ({
    attributeName: r ? 'r' : 'opacity',
    repeatCount: 'indefinite',
    dur: '1.5s',
    values: r ? '0;40' : '1;0',
    keySplines: r ? '0 0.2 0.8 1' : '0.2 0 0.8 1',
    keyTimes: '0;1',
    calcMode: 'spline',
  })

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {points.map(({ color, begin, r }, index) => (
        <circle
          key={index}
          cx="50"
          cy="50"
          r={r}
          style={{ fill: 'none', stroke: color, strokeWidth: 3 }}>
          <animate {...getAttributes(true)} begin={begin} />
          <animate {...getAttributes(false)} begin={begin} />
        </circle>
      ))}
    </SVG>
  )
}
