import * as React from 'react'
import { SpinnerSVGProps } from './Spinner'

export const Gear = ({ size, colors, ...props }: SpinnerSVGProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: size,
        width: size,
      }}
      {...props}>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0;45"
        keyTimes="0;1"
        dur="0.2331002331002331s"
        repeatCount="indefinite"
      />
      <g transform="translate(50 50)">
        <path
          d="M26.833-8h14V8h-14a28 28 0 0 1-2.202 5.317l9.899 9.9L23.216 34.53l-9.9-9.9A28 28 0 0 1 8 26.834v14H-8v-14a28 28 0 0 1-5.317-2.202l-9.9 9.899-11.313-11.314 9.9-9.9A28 28 0 0 1-26.834 8h-14V-8h14a28 28 0 0 1 2.202-5.317l-9.899-9.9 11.314-11.313 9.9 9.9A28 28 0 0 1-8-26.834v-14H8v14a28 28 0 0 1 5.317 2.202l9.9-9.899L34.53-23.216l-9.9 9.9A28 28 0 0 1 26.834-8M0-16a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
          fill={colors[0]}
        />
      </g>
    </svg>
  )
}
