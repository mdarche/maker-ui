import { Interpolation } from '@emotion/react'

export type Breakpoints = (string | number)[]

export interface MakerProps {
  css?: Interpolation<any>
  breakpoints?: Breakpoints
}

export type ResponsiveScale =
  | string
  | string[]
  | number
  | number[]
  | (string | number)[]

declare module 'react' {
  interface Attributes extends MakerProps {}
}

export { Interpolation }
