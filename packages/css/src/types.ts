import { Interpolation } from '@emotion/react'

export type Breakpoints = (string | number)[]

export interface MakerProps {
  css?: Interpolation<any>
  breakpoints?: Breakpoints
}

declare module 'react' {
  interface Attributes extends MakerProps {}
}
