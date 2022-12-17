import * as React from 'react'
import { SpinnerSVGProps } from './Spinner'

export const Dots = ({
  size,
  colors: { primary, secondary, third, fourth },
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { translate: '25 50', scale: '.81144', begin: '-0.4166', color: primary },
    { translate: '50 50', scale: '.35566', begin: '-0.2083', color: secondary },
    { translate: '75 50', scale: '.01406', begin: '0', color: third },
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      {...props}>
      {points.map(({ translate, scale, begin, color }, index) => (
        <g key={index} transform={`translate(${translate})`}>
          <circle r="9" transform={`scale(${scale})`} style={{ fill: color }}>
            <animateTransform
              attributeName="transform"
              type="scale"
              begin={`${begin}s`}
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.25s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  )
}
