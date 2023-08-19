import { type MenuItem } from 'maker-ui/layout'

export const menu: MenuItem[] = [
  { label: 'Home', path: '/' },
  // {
  //   label: 'Megamenu',
  //   path: '/about',
  //   megamenu: (
  //     <div style={{ height: 200, width: 200, background: '#000' }}>
  //       Lets go!
  //     </div>
  //   ),
  // },
  {label: 'Layout API', path: '/ref/layout'},
  {
    label: 'Components API',
    path: '/ref/components',
    openNested: true,
    submenu: [
      { label: 'Accordion', path: '/docs/accordion' },
      { label: 'Carousel', path: '/docs/carousel' },
      { label: 'Forms', path: '/docs/forms' },
      { label: 'Lightbox', path: '/docs/lightbox' },
      { label: 'SmartGrid', path: '/docs/smart-grid' },
      { label: 'SmartTable', path: '/docs/smart-table' },
      { label: 'Modal', path: '/docs/modal' },
      { label: 'Notifications', path: '/docs/notifications' },
      { label: 'Popovers', path: '/docs/popovers' },
      { label: 'Scroll', path: '/docs/scroll' },
      { label: 'Social', path: '/docs/social' },
      { label: 'Spinners', path: '/docs/spinners' },
      { label: 'Style', path: '/docs/style' },
      { label: 'Tabs', path: '/docs/tabs' },
      { label: 'Transition', path: '/docs/transition' },
    ],
  },
]
