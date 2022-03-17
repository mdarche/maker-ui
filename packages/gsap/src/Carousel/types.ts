import type { ResponsiveScale } from '@maker-ui/css'

export interface CarouselSettings {
  autoPlay?: boolean
  autoPlayLimit?: number
  draggable?: boolean
  hideControls?: boolean
  showControlsOnHover?: boolean
  /** Delay in seconds that each slide is displayed before changing */
  delay?: number
  /** Duration of the transition animation in seconds */
  duration?: number
  transition?: 'fade' | 'slide' | 'scale'
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
