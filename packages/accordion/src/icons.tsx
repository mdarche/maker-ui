import * as React from 'react'

interface CaretProps extends Partial<HTMLOrSVGElement> {
  show: boolean
}

/**
 * Default Caret Icon for the accordion
 */
export const CaretIcon = ({ show, ...props }: CaretProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{
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
  </svg>
)
