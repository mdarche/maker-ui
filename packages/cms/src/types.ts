import type { ResponsiveCSS, Breakpoints, MediaQuery } from 'maker-ui'

type SectionLayout = 'columns' | 'stack' | 'float' | 'grid' | 'scroll-x'
type CSSType = 'css' | 'css-in-js'
type ComponentType =
  | 'accordion'
  | 'tabs'
  | 'carousel'
  | 'lightbox'
  | 'modal'
  | 'text'
  | 'image'
  | 'video'
  | 'gallery'
  | 'social'
  | 'button'
  | 'menu'
  | 'code'
  | 'custom'

export interface StyleBox {
  top?: ResponsiveCSS
  left?: ResponsiveCSS
  right?: ResponsiveCSS
  bottom?: ResponsiveCSS
}

interface SectionSettings {
  width?: ResponsiveCSS | 'full' // Width of the content, not the section
  height?: ResponsiveCSS | 'full'
  gridGap?: ResponsiveCSS
  gridCols?: ResponsiveCSS
  gridRows?: ResponsiveCSS
}

interface CMSStyle {
  padding?: StyleBox | ResponsiveCSS
  margin: StyleBox | ResponsiveCSS
  border?: StyleBox | ResponsiveCSS
  background?: CMSBackground
}

interface CMSBackground {
  color?: ResponsiveCSS
  media?: 'none' | 'image' | 'video'
  image?: string
  video?: string
  poster?: string
  blur?: string
  position?: string
  overlay?: string | React.ReactElement
}

interface ContentItem {
  id?: string
  isContainer?: boolean
  colSpan?: ResponsiveCSS
  content?: ContentItem[] // Nested content if isContainer is true
  component?: ComponentType
  data?: any // Depends on the component type. Empty if isContainer is true
  settings?: any // Depends on the component type. Empty if isContainer is true
  classNames?: {} // Depends on the classnames used in the component
  styles?: CMSStyle
  createdAt: string
  updatedAt: string
}

export interface CMSSection {
  id?: string
  content?: ContentItem[]
  css?: ResponsiveCSS
  cssType?: CSSType
  breakpoints?: Breakpoints
  layout?: SectionLayout
  settings?: SectionSettings
  styles?: CMSStyle
  classNames?: {
    section?: string
    container?: string
  }
  createdAt: string
  updatedAt: string
}

export interface SEOSettings {
  title?: string
  description?: string
  image?: string
  meta: [{ name: string; content: string }]
}

export interface Author {
  id: string
  username: string
  name: string
  email: string
  bio: string
  avatar: string
  role: 'admin' | 'editor' | 'author'
  createdAt: string
  updatedAt: string
}

export type PageLayout =
  | 'default'
  | 'sidebar-content'
  | 'content-sidebar'
  | 'sidebar-content-sidebar'

export type PageTemplate =
  | 'default'
  | 'blog'
  | 'product'
  | 'collection'
  | 'landing'
  | 'form'
  | 'video'
  | 'gallery'

interface PageSettings {
  widthSidebar?: ResponsiveCSS
  widthSidebarRight?: ResponsiveCSS
}

type CMSHeader = string // Register this in the CMS -- this is a key to a registered header
type CMSFooter = string // Register this in the CMS -- this is a key to a registered footer

export interface CMSPage {
  id: string
  title: string
  slug: string
  postType: 'page' | 'post'
  status: 'published' | 'draft' | 'archived'
  // Array of functions that return true or false to determine if the page should be accessible to the current user
  policies?: (() => boolean)[]
  author: Author
  css?: ResponsiveCSS
  cssType?: CSSType
  breakpoints?: Breakpoints
  scripts?: string
  header?: CMSHeader
  footer?: CMSFooter
  sections: CMSSection[]
  settings?: PageSettings
  seo: SEOSettings
  createdAt: string
  updatedAt: string
}

export interface EditorSession {
  preview: boolean
  previewUrl: string
  previewSize: 'iphone' | 'ipad' | 'desktop' | { width: number; height: number }
  savedEdits: number
  totalEdits: number
  lastSaved: string
}

export interface Theme {
  id: string // name of the theme (e.g. 'dark')
  name: string // display name of the theme (e.g. 'Dark Mode')
  variables: {
    // Make sure we always show the output variables
    [key: string]: string
  }
}

export interface CMSSettings {
  siteName: string
  siteUrl: string
  siteDescription: string
  logo: string | React.ReactElement
  favicon: string
  seo: SEOSettings
  adminStyles: {}
  styles: {
    css?: ResponsiveCSS | string
    cssType?: CSSType
    breakpoints: Breakpoints
    mediaQuery: MediaQuery
    variables: {
      // Workspace
    }
    systemTheme?: boolean
    darkAndLight?: boolean
    themes: []
  }
  social: {
    facebook: string
    twitter: string
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

export interface PostSchedule {
  id: string
  postId: string
  date: string
  author: Author
  createdAt: string
  updatedAt: string
}

/** Need to map out a list of required Admin pages
 * - Login
 * - Dashboard
 * - Pages
 * - Posts
 * - Media
 * - Users
 * - Settings
 * -- General
 * -- SEO
 * -- Social
 * -- Styles
 * -- Themes
 * -- Layouts
 */
