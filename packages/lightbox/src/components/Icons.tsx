import * as React from 'react'

export const DefaultArrow = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    style={{ height: 30, fill: '#fff', ...(props.style as object) }}
    {...props}
    viewBox="0 0 39 70">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </svg>
)

export const PlayIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const PreviewIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const CloseIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)
