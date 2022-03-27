import * as React from 'react'
import { SVG } from '@maker-ui/primitives'
import { SpinnerSVGProps } from './Spinner'

export const Classic = ({
  size,
  colors: { primary },
  css,
  ...props
}: SpinnerSVGProps) => {
  const attributes = {
    rect: {
      fill: primary,
      x: '45.5',
      y: '4.5',
      rx: '2.31',
      ry: '2.31',
      width: '9',
      height: '21',
    },
    animate: {
      attributeName: 'opacity',
      values: '1;0',
      keyTimes: '0;1',
      dur: '1s',
      repeatCount: 'indefinite',
    },
  }

  const dynamic = [
    { transform: undefined, begin: '-0.9166666666666666s' },
    { transform: 'rotate(30 50 50)', begin: '-0.8333333333333334s' },
    { transform: 'rotate(60 50 50)', begin: '-0.75s' },
    { transform: 'rotate(90 50 50)', begin: '-0.6666666666666666s' },
    { transform: 'rotate(120 50 50)', begin: '-0.5833333333333334s' },
    { transform: 'rotate(150 50 50)', begin: '-0.5s' },
    { transform: 'rotate(180 50 50)', begin: '-0.4166666666666667s' },
    { transform: 'rotate(210 50 50)', begin: '-0.3333333333333333s' },
    { transform: 'rotate(240 50 50)', begin: '-0.25s' },
    { transform: 'rotate(270 50 50)', begin: '-0.16666666666666666s' },
    { transform: 'rotate(300 50 50)', begin: '-0.08333333333333333s' },
    { transform: 'rotate(330 50 50)', begin: '0s' },
  ]

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {dynamic.map(({ transform, begin }, i) => (
        <rect key={i} {...attributes.rect} transform={transform}>
          <animate {...attributes.animate} begin={begin} />
        </rect>
      ))}
      {/* <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.9166666666666666s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(30 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.8333333333333334s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(60 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.75s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(90 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.6666666666666666s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(120 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.5833333333333334s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(150 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.5s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(180 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.4166666666666667s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(210 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.3333333333333333s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(240 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.25s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(270 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.16666666666666666s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(300 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.08333333333333333s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="45.5"
        y="4.5"
        rx="2.31"
        ry="2.31"
        width="9"
        height="21"
        fill="#fe718d"
        transform="rotate(330 50 50)">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </rect> */}
    </SVG>
  )
}
