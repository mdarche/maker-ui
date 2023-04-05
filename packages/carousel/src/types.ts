import * as React from 'react'

export enum SlideDirection {
  Right = -1,
  Left = 1,
}

export interface CarouselClasses {
  root?: string
  slide?: string
  slider?: string
  slideTrack?: string
  navigation?: string
  page?: string
  arrow?: string
}

export type SlideItem = React.ReactElement

type ResponsiveValue = string | number | (string | number)[]

export interface CarouselProps {
  /** The carousel must contain child nodes that will be registered as slides. */
  children: React.ReactElement[]
  /** Number of items to show per slide.
   * @default 1
   */
  show?: number
  /** Number of items to slide per click or touch / drag gesture.
   * @default 1
   */
  slide?: number
  /** CSS transition duration for each slide.
   * @default 0.5
   */
  transition?: number
  /** Enable swiping and drag events for mouse and touch enabled devices.
   * @default true
   */
  draggable?: boolean
  /** Percentage of item width (as a decimal) that serves as the drag limit in order to register
   * a slide change. For example, if dragX is set to 0.25, the user must drag at least 25% of the
   * slide item width in order to trigger a slide change.
   * @default 0.25
   */
  dragX?: number
  /** If true, slide items will change width dynamically according to the screen size.
   * @default true
   */
  responsive?: boolean
  /** If true, the carousel will loop infinitely.
   * @default true
   */
  infinite?: boolean
  /** Custom classNames for all carousel sub-components. You can use these classNames to add
   * custom styles.*/
  classNames?: CarouselClasses | null
  /** If true, the left and right arrow keys can be used to navigate slides.
   * @default false
   */
  useArrowKeys?: boolean
  /** Set this to true if any of your slide items are stateful. Additionally, add a unique
   * key to each item to prevent the carousel from unnecessary re-renders.
   * @default false
   */
  dynamic?: boolean
  /** An optional callback function that is called whenever a slide changes. */
  paginationCallback?: ((direction: SlideDirection) => any) | null
  // TO FIGURE OUT
  pageCount?: number
  /** If true, the carousel will not render left and right arrow navigation.
   * @default false
   */
  hideArrows?: boolean
  /** Settings for carousel arrows */
  arrows?: {
    /** Padding applied to each navigation button
     * @default 20
     */
    padding?: ResponsiveValue
    /** Margin applied to each button
     * @default 0
     */
    margin?: ResponsiveValue
    /** A custom React element that will be rendered as the Left (previous) arrow. */
    left?: React.ReactElement | null
    /** A custom React element that will be rendered as the Right (next) arrow. */
    right?: React.ReactElement | null
    /** An optional callback function that is executed when the left arrow is clicked. */
    onLeftArrowClick?: () => void
    /** An optional callback function that is executed when the right arrow is clicked. */
    onRightArrowClick?: () => void
  } | null
  /** If true, the carousel will not show any page indicator buttons.
   * @default false
   */
  hidePagination?: boolean
  /** Settings for carousel page indicators. Note that many of these style and positioning settings
   * only apply if the `navigation` prop is undefined.
   */
  pagination?: {
    /** If true, the carousel navigation container will be absolutely positioned
     * inside the carousel.
     * @default true
     * */
    absolute?: boolean
    /** The position of the pagination container in the carousel. The `absolute` setting must
     * be true to achieve this effect.
     * @default 'bottom'
     */
    position?: 'top' | 'bottom' | 'right' | 'left'
    /** Margin of the pagination container relative to the edge of the carousel
     * @default 30
     */
    margin?: ResponsiveValue
    /** Distance between each page indicator
     * @default 10
     */
    spacing?: ResponsiveValue
    /** The height of page indicator (default only)
     * @default 10
     */
    height?: ResponsiveValue
    /** The width of page indicator (default only)
     * @default 10
     */
    width?: ResponsiveValue
    /** The page indicator's border radius value. Default is 50% for a circle
     * @default '50%''
     */
    borderRadius?: ResponsiveValue
    /** The color of the active page indicator
     * @default '#fff'
     */
    colorActive?: string
    /** The color of muted / inactive page indicators
     * @default 'rgba(0, 0, 0, 0.25)''
     */
    colorMuted?: string
  }
  navigate?: number
  /** A number in seconds that determines how long a slide will stay visible until changing. */
  autoPlay?: number
  /** The number of times that autoPlay should loop through the carousel.
   * @default -1 (infinite)
   */
  autoPlayLimit?: number
  /** Determines when to begin registering a drag event.
   * @default Number.MIN_SAFE_INTEGER
   */
  triggerClickOn?: number
  /** A render prop that lets you create custom page indicators. You can spread the second
   * parameter (button attributes) as props for your custom buttom.
   * 
   * @example  
   * <Carousel 
   *    navigation={(active, attrs) => (
          <button {...attrs}>
            active ? 'Active' : 'inactive'}
          </button>
      )}>...
   */
  navigation?: (selected: boolean, attributes: object) => React.ReactElement
}
