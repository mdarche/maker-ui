import * as React from 'react'
import { SVG, type SVGProps } from '@maker-ui/primitives'

export const DefaultArrow = (props: SVGProps) => (
  <SVG
    css={{ height: 30, fill: '#fff', ...(props.css as object) }}
    {...props}
    viewBox="0 0 39 70">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </SVG>
)

export const PlayIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
)

export const PreviewIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 24 24">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
)

export const ZoomIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 512 512">
    <path d="M506.141 477.851L361.689 333.399c65.814-80.075 61.336-198.944-13.451-273.73-79.559-79.559-209.01-79.559-288.569 0s-79.559 209.01 0 288.569c74.766 74.766 193.62 79.293 273.73 13.451l144.452 144.452c7.812 7.812 20.477 7.812 28.289 0 7.813-7.813 7.813-20.478.001-28.29zM319.949 319.948c-63.96 63.96-168.03 63.959-231.99 0-63.96-63.96-63.96-168.03 0-231.99 63.958-63.957 168.028-63.962 231.99 0 63.96 63.96 63.96 168.03 0 231.99z" />
    <path d="M301.897 183.949h-77.94v-77.94c0-11.048-8.956-20.004-20.004-20.004-11.048 0-20.004 8.956-20.004 20.004v77.94h-77.94c-11.048 0-20.004 8.956-20.004 20.004 0 11.048 8.956 20.004 20.004 20.004h77.94v77.94c0 11.048 8.956 20.004 20.004 20.004 11.048 0 20.004-8.956 20.004-20.004v-77.94h77.94c11.048 0 20.004-8.956 20.004-20.004 0-11.048-8.956-20.004-20.004-20.004z" />
  </SVG>
)

export const CloseIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SVG>
)
