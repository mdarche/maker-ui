import * as React from 'react'

type SVGProps = React.SVGAttributes<SVGElement>

export const ErrorIcon = (props: SVGProps) => (
  <svg
    className="icon-error"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    {...props}>
    <path d="M16 2.833C8.728 2.833 2.833 8.728 2.833 16S8.728 29.167 16 29.167 29.167 23.272 29.167 16 23.272 2.833 16 2.833ZM.833 16C.833 7.624 7.623.833 16 .833c8.376 0 15.167 6.79 15.167 15.167 0 8.376-6.79 15.167-15.167 15.167C7.624 31.167.833 24.377.833 16Z" />
    <path d="M16 8.833a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 1 1-3 0v-5.667a1.5 1.5 0 0 1 1.5-1.5ZM14.4 21.667a1.6 1.6 0 0 1 1.6-1.6h.015a1.6 1.6 0 1 1 0 3.2H16a1.6 1.6 0 0 1-1.6-1.6Z" />
  </svg>
)

export const SaveIcon = (props: SVGProps) => (
  <svg
    className="icon-save"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    {...props}>
    <path d="M4.25 2.75a1.5 1.5 0 0 0-1.5 1.5v17.5a1.5 1.5 0 0 0 1.5 1.5h17.5a1.5 1.5 0 0 0 1.5-1.5V8.414L17.586 2.75H4.25Zm-2.475-.975A3.5 3.5 0 0 1 4.25.75H18a1 1 0 0 1 .707.293l6.25 6.25A1 1 0 0 1 25.25 8v13.75a3.5 3.5 0 0 1-3.5 3.5H4.25a3.5 3.5 0 0 1-3.5-3.5V4.25a3.5 3.5 0 0 1 1.025-2.475Z" />
    <path d="M5.75 14.25a1 1 0 0 1 1-1h12.5a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-9H7.75v9a1 1 0 1 1-2 0v-10ZM6.75.75a1 1 0 0 1 1 1V7h9a1 1 0 1 1 0 2h-10a1 1 0 0 1-1-1V1.75a1 1 0 0 1 1-1Z" />
  </svg>
)

export const SuccessIcon = (props: SVGProps) => (
  <svg
    className="icon-success"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    {...props}>
    <path d="M19.918 3.955A12.083 12.083 0 1 0 27.083 15v-1.226a1.25 1.25 0 1 1 2.5 0V15A14.585 14.585 0 0 1 9.946 28.672a14.583 14.583 0 1 1 10.99-27 1.25 1.25 0 1 1-1.018 2.283Z" />
    <path d="M29.217 3.449a1.25 1.25 0 0 1 0 1.768L15.885 18.564a1.25 1.25 0 0 1-1.768 0l-4-4a1.25 1.25 0 1 1 1.768-1.768L15 15.912 27.449 3.45a1.25 1.25 0 0 1 1.768-.001Z" />
  </svg>
)

export const InfoIcon = (props: SVGProps) => (
  <svg
    className="icon-info"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...props}>
    <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" />
  </svg>
)

export const CloseIcon = (
  props: React.HtmlHTMLAttributes<HTMLOrSVGElement>
) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)
