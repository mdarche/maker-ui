import { MakerOptions } from '../types'
import { setBreakpoint } from '../../utils/helper'

const desktop = {
  basic: {
    areas: '"logo menu nav"',
    columns: '',
  },
  'basic-left': {
    areas: '"logo menu nav"',
    columns: '',
  },
  'basic-center': {
    areas: '"logo menu nav"',
    columns: '',
  },
  center: {
    areas: '"logo logo" "menu nav"',
    columns: '1fr',
    rows: '1fr 1fr',
  },
  split: {
    areas: '"menu-split logo menu nav"',
    columns: '1fr .25fr 1fr',
  },
  reverse: {
    areas: '"menu logo nav"',
    columns: '1fr .25fr 1fr',
  },
  minimal: {
    areas: '"logo nav"',
    columns: '.3fr .7fr',
  },
  'minimal-left': {
    areas: '"button logo nav"',
    columns: '',
  },
  'minimal-center': {
    areas: '"button logo nav"',
    columns: '',
  },
}

const mobile = {
  basic: {
    areas: '"logo nav"',
    columns: '',
  },
  'basic-left': {
    areas: '"button logo nav"',
    columns: '',
  },
  'logo-center': {
    areas: '"button logo nav"',
    columns: '',
  },
  'logo-center-alt': {
    areas: '"nav logo button"',
    columns: '',
  },
}

/**
 * Calculate grid-template-area, grid-template-columns, and grid-template-rows
 */

export function gridStyles(
  layout: string,
  mobileLayout: string,
  grid: MakerOptions['header']['grid'],
  bp: MakerOptions['header']['bpIndex']
) {
  return {
    gridTemplateAreas: setBreakpoint(bp, [
      mobile[mobileLayout].areas,
      desktop[layout].areas,
    ]),
    gridTemplateColumns: setBreakpoint(bp, [
      mobile[mobileLayout].columns,
      desktop[layout].columns,
    ]),
    gridTemplateRows: setBreakpoint(bp, [
      '1fr',
      layout !== 'center' ? '1fr' : '1fr 1fr',
    ]),
    gridColumnGap: '10px', // TODO add config support
    gridRowGap: '10px', // TODO add config support
    ...hideColumn(layout),
    ...absolutePosition(layout),
    // nested flex justification
    // overflow flex vs scroll
  }
}

function hideColumn(layout: string) {
  const hideMenu = ['minimal', 'minimal-left', 'minimal-center']
  return hideMenu.includes(layout)
    ? { '.menu-area': { display: 'none' } }
    : null
}

function absolutePosition(layout: string) {
  const abs = ['center', 'split']
  return abs.includes(layout)
    ? {
        '.nav-area': {
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
        },
      }
    : null
}
