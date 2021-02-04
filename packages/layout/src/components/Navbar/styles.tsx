import { navTypes, mobileNavTypes } from '../../constants'

/**  Grid & flex justification styles for desktop */
const desktop = {
  basic: {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    navArea: 'flex-start',
    menuArea: 'flex-end',
  },
  'basic-left': {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    navArea: 'flex-start',
    menuArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    navArea: 'flex-start',
    menuArea: 'center',
  },
  center: {
    areas: '"logo logo" "menu nav"',
    columns: '1fr',
    navArea: 'flex-start',
    menuArea: 'center',
  },
  split: {
    areas: '"menu-split logo menu nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-start',
    menuArea: false,
  },
  reverse: {
    areas: '"menu logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
    menuArea: false,
  },
  minimal: {
    areas: '"logo nav"',
    columns: 'auto 1fr',
    navArea: 'flex-end',
    menuArea: false,
  },
  'minimal-left': {
    areas: '"button logo nav"',
    columns: 'auto auto 1fr',
    navArea: 'flex-end',
    menuArea: false,
  },
  'minimal-center': {
    areas: '"button logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
    menuArea: false,
  },
}

/**  Grid & flex justification styles for mobile */
const mobile = {
  basic: {
    areas: '"logo nav"',
    columns: 'auto 1fr',
    navArea: 'flex-end',
  },
  'basic-menu-left': {
    areas: '"button logo nav"',
    columns: 'auto auto 1fr',
    navArea: 'flex-end',
  },
  'logo-center': {
    areas: '"button logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
  },
  'logo-center-alt': {
    areas: '"nav logo button"',
    columns: '1fr auto 1fr',
    navArea: 'flex-start',
  },
}

/**
 * Calculate grid-template-area, grid-template-columns, and grid-template-rows
 */
export function gridStyles(
  layout: typeof navTypes[number],
  mobileLayout: typeof mobileNavTypes[number]
): object {
  return {
    gridTemplateAreas: [mobile[mobileLayout].areas, desktop[layout].areas],
    gridTemplateColumns: [
      mobile[mobileLayout].columns,
      desktop[layout].columns,
    ],
    gridTemplateRows: ['1fr', layout !== 'center' ? '1fr' : '1fr 1fr'],
    gap: 0,
    '.nav-area': {
      ...absolutePosition(layout),
      justifyContent: [mobile[mobileLayout].navArea, desktop[layout].navArea],
    },
    '.menu-area': {
      justifyContent: desktop[layout].menuArea
        ? desktop[layout].menuArea
        : undefined,
    },
    '.menu-area.split': { justifyContent: 'flex-end' },
    '&.layout-center .logo-area': {
      justifyContent: 'center',
    },
    '&.layout-minimal, &.layout-minimal-left, &.layout-minimal-center': {
      '.menu-area': {
        display: 'none',
      },
    },
    '&.layout-minimal-center .button-area': {
      justifyContent: 'flex-start',
    },
    '&.m-layout-logo-center-alt .button-area': {
      justifyContent: ['flex-end', 'flex-start'],
    },
    // overflow flex-wrap vs scroll
  }
}

/**
 * Add absolute positioning to nav-area for `split` and `center` desktop layouts
 */

function absolutePosition(layout: string) {
  const abs = ['center', 'split']
  return abs.includes(layout)
    ? {
        position: ['relative', 'absolute'],
        top: 0,
        right: 0,
        height: '100%',
      }
    : undefined
}
