import { MenuItem } from 'maker-ui/layout'

export const primaryMenu: MenuItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Megamenu',
    path: '/about',
    megamenu: (
      <div style={{ height: 200, width: 200, background: '#000' }}>
        Lets go!
      </div>
    ),
  },
  {
    label: 'Components',
    path: '/components',
    openNested: true,
    submenu: [
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Carousel', path: '/components/carousel' },
      { label: 'Forms', path: '/components/forms' },
      { label: 'Lightbox', path: '/components/lightbox' },
      { label: 'SmartGrid', path: '/components/smart-grid' },
      { label: 'SmartTable', path: '/components/smart-table' },
      { label: 'Modal', path: '/components/modal' },
      { label: 'Notifications', path: '/components/notifications' },
      { label: 'Popovers', path: '/components/popovers' },
      { label: 'Scroll', path: '/components/scroll' },
      { label: 'Social', path: '/components/social' },
      { label: 'Spinners', path: '/components/spinners' },
      { label: 'Style', path: '/components/style' },
      { label: 'Tabs', path: '/components/tabs' },
      { label: 'Transition', path: '/components/transition' },
    ],
  },
  {
    label: 'Layouts',
    path: '/layout',
    submenu: [
      { label: 'Left Panel', path: '/layout/left-panel' },
      { label: 'Right Panel', path: '/layout/right-panel' },
      { label: 'Both Panels', path: '/layout/both' },
    ],
  },
]
