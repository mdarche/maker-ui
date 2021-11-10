import * as React from 'react'
import { SVG, SVGProps } from 'maker-ui'

export const CloseIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SVG>
)

interface CaretProps extends SVGProps {
  show: boolean
}

export const CaretIcon = ({ show, ...props }: CaretProps) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    css={{
      width: 15,
      transition: 'all ease .3s',
      transform: !show ? 'rotate(0)' : 'rotate(180deg)',
    }}
    {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M21 8.5l-9 9-9-9"
    />
  </SVG>
)
