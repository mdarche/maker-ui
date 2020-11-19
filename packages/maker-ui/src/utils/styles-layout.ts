import { format, setBreakpoint } from './helper'
/**
 * Internal Maker UI variants for page content layouts
 *
 * @internal only
 *
 */

const sidebar = (layout: string, bp: number) => ({
  display: 'grid',
  gridGap: t => t.gap.gap_content,
  maxWidth: 'maxWidth_content',
  mx: 'auto',
  minHeight: '80vh',
  gridTemplateColumns: t => {
    const width = format(t.sizes.width_sidebar)
    const grid =
      layout === 'sidebar content'
        ? `${width} 1fr`
        : layout === 'sidebar content sidebar'
        ? `${width} 1fr ${width}`
        : layout === 'content sidebar'
        ? `1fr ${width}`
        : null

    return setBreakpoint(bp, [`1fr`, grid])
  },
  ...sidebarPartial(layout),
})

const sidebarPartial = (layout: string) =>
  layout === 'sidebar content'
    ? {
        '.sidebar': {
          gridRow: [2, 'auto'],
        },
      }
    : layout === 'sidebar content sidebar'
    ? {
        '.sidebar:first-of-type': {
          gridRow: [2, 'auto'],
        },
      }
    : null

const sideNav = (layout: string) => ({
  display: 'flex',
  '#content': {
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  },
  '#sidenav': {
    right: layout === 'content sidenav' && 0,
    left: layout === 'sidenav content' && 0,
  },
  '#toggle-sidenav': {
    right: layout === 'sidenav content' && 30,
    left: layout === 'content sidenav' && 30,
  },
})

export const getLayoutStyles = (layout: string, bp: number) => {
  if (layout && layout.includes('sidebar')) {
    return sidebar(layout, bp)
  }

  if (layout && layout.includes('sidenav')) {
    return sideNav(layout)
  }

  if (layout && layout.includes('workspace')) {
    return {
      display: 'block',
      width: '100%',
    }
  }

  return {
    display: 'block',
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  }
}
