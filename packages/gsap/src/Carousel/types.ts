import type { ResponsiveScale } from '@maker-ui/css'

export interface CarouselSettings {
  autoPlay?: boolean
  draggable?: boolean
  infiniteScroll?: boolean
  hideControls?: boolean
  showControlsOnHover?: boolean
  /** Duration in milliseconds that each slide is displayed before changing */
  duration?: number // milliseconds
  transition?: 'fade' | 'slide' | 'scale'
  fadeDuration?: number // seconds
}

export interface ArrowSettings {
  custom?:
    | React.ReactElement
    | { prev?: React.ReactElement; next?: React.ReactElement }
  padding?: ResponsiveScale
  margin?: ResponsiveScale
}

export type Position = 'top' | 'bottom' | 'right' | 'left'

export interface DotSettings {
  position?: Position
  padding?: ResponsiveScale
  spacing?: ResponsiveScale
  colorActive?: string
  colorMuted?: string
}
