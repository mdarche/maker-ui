import type { ResponsiveScale, StyleObject } from '@maker-ui/css'
import type { DivProps } from '@maker-ui/primitives'

export interface SlideProps {
  index?: number
  isActive?: boolean
  draggable?: boolean
  onClick?: () => void
}

export interface SlideData extends SlideProps {
  [key: string]: any
}

export interface CarouselProps extends DivProps {
  /** Required array of data or React components that will be used to generate slides */
  data: SlideData[] | React.ReactElement[]
  /** Required component template for data
   * - Supply a React component that accepts props for each of the attributes in your `data` array
   * - Set to "custom" to indicate an array of custom components in the `data` array
   * */
  template: React.ReactElement | 'custom'
  /** The height of the carousel. Can be a responsive array value. */
  height?: ResponsiveScale
  /** Settings that control the carousel previous and next (arrow) buttons */
  arrows?: ArrowSettings | false
  /** Settings that control the carousel page indicators (dots) */
  dots?: DotSettings | false
  /** Settings that control the carousel */
  settings?: CarouselSettings
  /** An optional component that will sit on top of all slides and remain visible */
  overlay?: React.ReactElement
  /** External controls via useState hook */
  controls?: [number, React.Dispatch<React.SetStateAction<number>>]
}

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
  /**
   * The number of pixels required to register the drag event handler vs click handler
   */
  dragThreshold?: number
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
  /** The height of a slide.
   * @default '100%''
   */
  slideHeight?: ResponsiveScale
  /** The width of a slide. Default is 100% for full width slides, but you can
   * use a percentage or a responsive scale to customize.
   * @default '100%'
   */
  slideWidth?: ResponsiveScale
  /** If true, the slide container will have flex property `justify-content: center;`.
   * Helpful if slide width is not 100%.
   * @default false
   */
  center?: boolean
  /** Lets you control the `center` prop on mobile.
   * @default false
   */
  centerMobile?: boolean
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
