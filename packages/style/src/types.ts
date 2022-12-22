import * as CSS from 'csstype'

declare module 'csstype' {
  interface Properties {
    [index: string]: any
  }
}
type CSSRule = undefined | string | number | (string | number)[] | ResponsiveCSS

export type ResponsiveCSS = {
  [k in keyof CSS.Properties]: CSSRule
}

export type Breakpoints = (string | number)[]

export interface StyleSettings {
  root: string
  global?: boolean
  css?: ResponsiveCSS
  breakpoints?: Breakpoints
}
