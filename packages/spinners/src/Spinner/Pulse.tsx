import * as React from 'react'
import { SpinnerSVGProps } from './Spinner'

export const Pulse = ({ size, colors, ...props }: SpinnerSVGProps) => {
  const points = [
    { r: '24', begin: '-0.8', color: colors[0] },
    { r: '39.6', begin: '0', color: colors[1] },
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
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, width: size }}
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
    </svg>
  )
}
