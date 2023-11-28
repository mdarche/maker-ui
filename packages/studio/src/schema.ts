// Default schema

export interface AppSettings {
  siteName: string
  siteUrl: string
  siteDescription: string
  logo: string | React.ReactElement
  favicon: string
  // run through all defaults
  seo: SEOSettings
  // set up variables
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
  // items: MenuItem[] // TODO
}

export interface Component {
  id: string
  name: string
  description: string
  type: string
  specs: any // TODO
}

export interface ModuleProps {
  uuid: string
  pageId: string
  parentId: string
  componentId: string
  order: number
  column: number
  id: string
  className: string
  title: string
  theme: string
  visible: boolean
  type: 'GRID' | 'COMPONENT'
  data?: any // JSON to be parsed by component renderer specs
  css?: string
  jss?: string
  grid?: GridSettings[]
  styles: ModuleStyle[]
  createdAt: string
  updatedAt: string
}

interface GridSettings {
  breakpoint: string
  gridTemplateColumns?: string
  gap?: string
}

interface ModuleStyle {
  breakpoint: string
  padding: string
  margin: string
  background: string
  borderRadius: string
  border: string
  boxShadow: string
  maxWidth: string
}
