import * as React from 'react'
import { SpinnerSVGProps } from './Spinner'

// Circular Dots

export const DotSpinner = ({
  size,
  colors: { primary, secondary },
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { cx: '75', cy: '50', r: '3', begin: '-0.9166' },
    { cx: '71.651', cy: '62.5', r: '3', begin: '-0.8333' },
    { cx: '62.5', cy: '71.651', r: '3', begin: '-0.75' },
    { cx: '50', cy: '75', r: '3', begin: '-0.6666' },
    { cx: '37.5', cy: '71.651', r: '3', begin: '-0.5833' },
    { cx: '28.349', cy: '62.5', r: '3.269', begin: '-0.5' },
    { cx: '25', cy: '50', r: '3.936', begin: '-0.4166' },
    { cx: '28.349', cy: '37.5', r: '4.602', begin: '-0.3333' },
    { cx: '37.5', cy: '28.349', r: '4.731', begin: '-0.25' },
    { cx: '50', cy: '25', r: '4.064', begin: '-0.1666' },
    { cx: '62.5', cy: '28.349', r: '3.398', begin: '-0.0833' },
    { cx: '71.651', cy: '37.5', r: '3', begin: '0' },
  ]

  const getAttributes = (r: boolean) => ({
    attributeName: r ? 'r' : 'fill',
    values: r
      ? '3;3;5;3;3'
      : `${secondary};${secondary};${primary};${secondary};${secondary};`,
    repeatCount: 'indefinite',
    dur: '1s',
  })

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, width: size }}
      {...props}>
      {points.map(({ cy, cx, r, begin }, index) => (
        <circle key={index} cx={cx} cy={cy} fill={secondary} r={r}>
          <animate {...getAttributes(true)} begin={begin} />
          <animate {...getAttributes(false)} begin={begin} />
        </circle>
      ))}
    </svg>
  )
}
