import type { ResponsiveScale, StyleObject } from '@maker-ui/css'

// TODO - ADD `hideControls` prop with a timer to show / hide controls when user is not focusing or hovering over carousel

export interface CarouselSettings {
  /** A boolean that determines if the carousel should play automatically
   * @default true
   */
  autoPlay?: boolean
  /** The number of times that the carousel should loop on autoplay. Use -1 for infinite loops
   * @default 2
   */
  autoPlayLimit?: number
  /** Pauses the autoPlay timer when the user is focused inside the carousl or hovering over it
   * @default true
   */
  pauseOnHover?: boolean
  /** Delay in seconds that each slide is displayed before changing
   * @default 6.5
   */
  delay?: number
  /** Determines if the carousel can be controlled via drag and swipe gestures
   * @default true
   */
  draggable?: boolean
  /** The element that should be used to track drag and swipe gestures.
   * - `slide` - applied directly to each slide component
   * - `container` - applied to the carousel container (default)
   * - `overlay` - an absolutely positioned layer on top of each slide. Helpful for <img /> tag slides that hijack dragging
   * @default 'container'
   */
  dragTarget?: 'container' | 'slide' | 'overlay'
  /** Duration of the slide transition animation in seconds
   * @default 0.4
   */
  duration?: number
  /** GSAP easing curve for the transition animation
   * @default "power1.inOut"
   */
  ease?: string
}

export interface ArrowSettings {
  /** Custom arrow indicators for the carousel `previous` and `next` buttons.
   * - A single custom component will be used for the next button and rotated 180deg for previous
   * - You can also supply an object with custom components for each: `{ prev, next }`
   */
  custom?:
    | React.ReactElement
    | { prev?: React.ReactElement; next?: React.ReactElement }
  /** Padding applied to each navigation button
   * @default 20
   */
  padding?: ResponsiveScale
  /** Margin applied to each button
   * @default 0
   */
  margin?: ResponsiveScale
  /** Custom Maker UI CSS object that is applied to each navigation button.
   * - Any styles you add may override other settings like padding or margin
   */
  css?: StyleObject
}

export type Position = 'top' | 'bottom' | 'right' | 'left'

export interface DotSettings {
  /** The position of the pagination container in the carousel
   * @default 'bottom'
   */
  position?: Position
  /** Position of the pagination container relative to the edge of the carousel
   * @default 30
   */
  padding?: ResponsiveScale
  /** Distance between each page indicator
   * @default 10
   */
  spacing?: ResponsiveScale
  /** The height of a page indiciator
   * @default 10
   */
  height?: ResponsiveScale
  /** The width of a page indicator
   * @default 10
   */
  width?: ResponsiveScale
  /** The page indicator's border radius value. Default is 50% for a circle
   * @default '50%''
   */
  borderRadius?: ResponsiveScale
  /** The color of the active page indicator
   * @default '#fff'
   */
  colorActive?: string
  /** The color of muted / inactive page indicators
   * @default 'rgba(0, 0, 0, 0.25)''
   */
  colorMuted?: string
  /** Custom Maker UI CSS object that is applied to the page indicators
   * - Any styles you add may override other settings like height, width, etc.
   */
  css?: StyleObject
}
