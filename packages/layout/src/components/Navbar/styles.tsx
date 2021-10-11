import { navTypes, mobileNavTypes } from '../../constants'

/**
 * Grid & flex justification styles for desktop
 */

const desktop = {
  basic: {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
    menuArea: 'flex-end',
  },
  'basic-left': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
    menuArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
    menuArea: 'center',
  },
  center: {
    areas: '"logo logo" "menu widgets"',
    columns: '1fr',
    widgetArea: 'flex-start',
    menuArea: 'center',
  },
  split: {
    areas: '"menu-split logo menu widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-start',
    menuArea: false,
  },
  reverse: {
    areas: '"menu logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
    menuArea: false,
  },
  minimal: {
    areas: '"logo widgets"',
    columns: 'auto 1fr',
    widgetArea: 'flex-end',
    menuArea: false,
  },
  'minimal-left': {
    areas: '"button logo widgets"',
    columns: 'auto auto 1fr',
    widgetArea: 'flex-end',
    menuArea: false,
  },
  'minimal-center': {
    areas: '"button logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
    menuArea: false,
  },
}

/**
 * Grid & flex justification styles for mobile
 */
const mobile = {
  basic: {
    areas: '"logo widgets"',
    columns: 'auto 1fr',
    widgetArea: 'flex-end',
  },
  'basic-menu-left': {
    areas: '"button logo widgets"',
    columns: 'auto auto 1fr',
    widgetArea: 'flex-end',
  },
  'logo-center': {
    areas: '"button logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
  },
  'logo-center-alt': {
    areas: '"widgets logo button"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-start',
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
    '.widget-slot': {
      ...absolutePosition(layout),
      justifyContent: [
        mobile[mobileLayout].widgetArea,
        desktop[layout].widgetArea,
      ],
    },
    '.menu-slot': {
      justifyContent: desktop[layout].menuArea
        ? desktop[layout].menuArea
        : undefined,
    },
    '.menu-slot.split': { justifyContent: 'flex-end' },
    '&.layout-center .logo-slot': {
      justifyContent: 'center',
    },
    '&.layout-minimal, &.layout-minimal-left, &.layout-minimal-center': {
      '.menu-slot': {
        display: 'none',
      },
    },
    '&.layout-minimal-center .button-slot': {
      justifyContent: 'flex-start',
    },
    '&.m-layout-logo-center-alt .button-slot': {
      justifyContent: ['flex-end', 'flex-start'],
    },
  }
}

/**
 * Add absolute positioning to widget-area for `split` and `center` desktop layouts
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
