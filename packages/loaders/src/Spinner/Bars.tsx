import * as React from 'react'
import { SVG } from '@maker-ui/primitives'
import { SpinnerSVGProps } from './Spinner'

export const Bars = ({
  size,
  colors: { primary, secondary, third, fourth },
  css,
  ...props
}: SpinnerSVGProps) => {
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
    { color: primary, begin: '-.75', d: 'M13.5 30h13v40h-13z' },
    { color: secondary, begin: '-.5', d: 'M33.5 30h13v40h-13z' },
    { color: third, begin: '-.25', d: 'M53.5 30h13v40h-13z' },
    { color: fourth, begin: '-1.25', d: 'M73.5 30h13v40h-13z' },
  ]

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {dynamic.map(({ color, begin, d }, i) => (
        <path key={i} fill={color} d={d}>
          <animate {...attributes} begin={begin} />
        </path>
      ))}
    </SVG>
  )
}
