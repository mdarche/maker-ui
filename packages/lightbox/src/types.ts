import { ModalProps } from '@maker-ui/modal'
import { SpinnerProps } from '@maker-ui/spinners'
import { MakerCSS } from '@maker-ui/style'

/**
 * Interface for data passed to a lightbox component to display media content.
 */
export interface LightboxItem {
  /** The ID of the media content. */
  id?: string
  /** The source URL of the media content. */
  src?: string | React.ReactElement
  /** A blur image URL for Next Image, if applicable */
  blur?: string
  /** The alternative text description of the media content. */
  alt?: string
  /** The title of the media content. */
  title?: string
  /** The description of the media content. */
  description?: string
  /** The ID of the YouTube video. */
  youtubeId?: string
  /** The ID of the Vimeo video. */
  vimeoId?: string
  /** Flag indicating if the media content is an HTML video. */
  htmlVideo?: boolean
  /** The URL of the poster image to display for the media content. */
  poster?: string
  /** The React component to render for the media content. */
  component?: React.ReactNode
}

export interface LightboxSettings {
  /**
   * Flag indicating if the lightbox should close when the user clicks outside of it.
   * @default true
   */
  closeOnBlur?: boolean
  /**
   * Flag indicating if the lightbox should display media information (title and description).
   * @default true
   */
  showInfo?: boolean
  /**
   * Flag indicating if the lightbox should display a count of the current media item and the total number of items.
   * @default true
   */
  showCount?: boolean
  /**
   * Flag indicating if the lightbox should automatically play videos when they are displayed.
   * @default true
   */
  showAutoPlay?: boolean
  /**
   * The duration in milliseconds for each media item to display when autoplay is enabled.
   * @default 6000
   */
  autoPlayDuration?: number
  /**
   * Flag indicating if the lightbox controls should remain visible when the mouse is not over the lightbox.
   * @default false
   * @todo revisit this functionality
   */
  disableHideControls?: boolean
  /**
   * The type of spinner to display while the media content is loading.
   * @default 'dots'
   */
  spinnerType?: SpinnerProps['type']
  /** A custom arrow that will be used instead of the default. The arrow should be pointing right.
   * For the left arrow (previous), it will be rotated 180 degrees.
   */
  arrowIcon?: React.ReactNode
  /** If true, the lightbox modal will render image files with Next Image instead of a standard img tag
   * @default true
   */
  nextImage?: boolean
}

export interface LightboxProps
  extends Omit<Partial<ModalProps>, 'closeOnBlur' | 'center' | 'appendTo'>,
    MakerCSS {
  /** An array of LightboxItems to render in the Lightbox if you are not using the LightboxLink component */
  data?: LightboxItem[]
  /** Custom settings for the Lightbox modal. */
  settings?: LightboxSettings
  /** Custom CSS variable declarations for the Lightbox modal. */
  styles?: LightboxStyles
}

export interface LightboxStyles {
  toolbar?: {
    background?: string
    padding?: string | number
    fill?: string
    height?: string | number
    backgroundActive?: string
    fillActive?: string
  }
  pagination?: {
    color?: string
    fontSize?: string | number
    fontFamily?: string
    padding: string | number
  }
  arrow?: {
    background?: string
    backgroundActive?: string
    fill?: string
    height?: string | number
    border?: string
    padding?: string | number
  }
  preview?: {
    background?: string
    iconFill?: string
    iconHeight?: string | number
    imageHeight?: string | number
    imageWidth?: string | number
    gap?: string | number
  }
}
