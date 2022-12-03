import { navTypes, mobileNavTypes } from '../../constants'

/**
 * Grid & flex justification styles for desktop
 */
const desktop = {
  basic: {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  'basic-left': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu widgets"',
    columns: 'auto 1fr auto',
    widgetArea: 'flex-start',
  },
  center: {
    areas: '"logo logo" "menu widgets"',
    columns: '1fr',
    widgetArea: 'flex-start',
  },
  split: {
    areas: '"menu-split logo menu widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-start',
  },
  reverse: {
    areas: '"menu logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
  },
  minimal: {
    areas: '"logo widgets"',
    columns: 'auto 1fr',
    widgetArea: 'flex-end',
  },
  'minimal-left': {
    areas: '"button logo widgets"',
    columns: 'auto auto 1fr',
    widgetArea: 'flex-end',
  },
  'minimal-center': {
    areas: '"button logo widgets"',
    columns: '1fr auto 1fr',
    widgetArea: 'flex-end',
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
 * Determine grid-template-area, grid-template-columns, and positioning
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
    '.widget-slot': {
      justifyContent: [
        mobile[mobileLayout].widgetArea,
        desktop[layout].widgetArea,
      ],
    },
  }
}
