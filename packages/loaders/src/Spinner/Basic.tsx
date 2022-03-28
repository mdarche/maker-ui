import * as React from 'react'
import { SVG } from '@maker-ui/primitives'
import { SpinnerSVGProps } from './Spinner'

export const Basic = ({
  size,
  colors: { primary },
  css,
  ...props
}: SpinnerSVGProps) => {
  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={primary}
        strokeWidth="9"
        r="37"
        strokeDasharray="174.35839227423352 60.119464091411174">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </SVG>
  )
}
