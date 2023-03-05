import * as React from 'react'
import { SpinnerSVGProps } from './Spinner'

export const Bars = ({ size, colors, ...props }: SpinnerSVGProps) => {
  const attributes = {
    attributeName: 'opacity',
    dur: '1.25s',
    repeatCount: 'indefinite',
    calcMode: 'spline',
    keyTimes: '0;0.5;1',
    keySplines: '0.5 0 0.5 1;0.5 0 0.5 1',
    values: '1;0.2;1',
  }

  const dynamic = [
    { color: colors[0], begin: '-.75', d: 'M13.5 30h13v40h-13z' },
    { color: colors[1], begin: '-.5', d: 'M33.5 30h13v40h-13z' },
    { color: colors[2], begin: '-.25', d: 'M53.5 30h13v40h-13z' },
    { color: colors[3], begin: '-1.25', d: 'M73.5 30h13v40h-13z' },
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, width: size }}
      {...props}>
      {dynamic.map(({ color, begin, d }, i) => (
        <path key={i} fill={color} d={d}>
          <animate {...attributes} begin={begin} />
        </path>
      ))}
    </svg>
  )
}
