// Default schema

export interface AppSettings {
  // run through all defaults
  // set up variables
}

export interface PageSettings {
  id: string
  title: string
  path: string
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'DELETED'
  breakpoints: string[]
  type: 'PARTIAL' | 'FULL'
  layout: 'CONTENT' | 'PANEL_CONTENT' | 'PANEL_CONTENT_PANEL' | 'CONTENT_PANEL'
  seo: {
    title: string
    description: string
    share_img: string
  }
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
