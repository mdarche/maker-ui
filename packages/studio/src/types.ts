// Default schema

import type { MenuItemProps } from '@maker-ui/layout'

export interface AppSettings {
  siteName: string
  siteUrl: string
  siteDescription: string
  logo: string | React.ReactElement
  favicon: string
  // run through all defaults
  seo: SEOSettings
  // TODO set up variables
  social: {
    x: string
    facebook: string
    instagram: string
    youtube: string
    pinterest: string
    linkedin: string
    tiktok: string
    github: string
    discord: string
    [key: string]: string
  }
}

interface SEOSettings {
  title: string
  description: string
  share_img: string
  template?: string
  meta: [{ name: string; content: string }]
}

export interface PageSettings {
  id: string
  title: string
  path: string
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'DELETED'
  breakpoints: string[]
  type: 'PARTIAL' | 'FULL'
  layout: 'CONTENT' | 'PANEL_CONTENT' | 'PANEL_CONTENT_PANEL' | 'CONTENT_PANEL'
  seo: SEOSettings
  createdAt: string
  updatedAt: string
}

export interface Menu {
  id: string
  name: string
  items: MenuItemProps[]
}

export interface Component {
  id: string
  name: string
  description: string
  type: string
  specs: any // TODO
}

export interface ModuleProps {
  id: string // Readonly uuid
  pageId: string // Readonly page id
  componentId: string // Readonly id of component type
  type: 'GRID' | 'COMPONENT' | 'COLUMN' // Readonly
  parentId?: string
  order?: number
  visible?: boolean
  isSection?: boolean
  data?: {
    [key: string]: any // JSON to be parsed / rendered via component specification (ie. accordion, video, gallery, etc.)
  }
  settings?: {
    id?: string
    className?: string
    theme?: string
    adminTitle?: string
    css?: string
  }
  styles: ModuleStyle[]
  createdAt: string // Readonly
  updatedAt: string // Readonly
}

export interface ModuleStyle {
  breakpoint: string
  // Box settings
  padding?: string
  border?: string
  borderRadius?: string
  margin?: string
  boxShadow?: string
  // Flex position
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  // Background
  background?: {
    color?: string
    gradient?: string
    imageUrl?: string
    videoUrl?: string
    videoPosterUrl?: string
    backgroundPosition?: string
    backgroundSize?: string
    backgroundRepeat?: string
    overlay?: string // color value
  }
  // Sizing
  height?: string
  width?: string
  minHeight?: string
  maxWidth?: string
  // Advanced
  animation?: string
  zIndex?: number
  transform?: string
  // Column only
  sticky?: boolean
  top?: string
  gridArea?: string
  // Grid only
  gridTemplateColumns?: string
  gridTemplateAreas?: string
  gridTemplateRows?: string
  gridColumnMode?: 'px' | 'fr' | '%'
  gap?: string
}
