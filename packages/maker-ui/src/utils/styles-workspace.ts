import { MakerOptions } from '../components/types'
import { format, setBreakpoint } from './helper'

const secondPanel = (layout: string) => {
  return layout.includes('panel canvas panel')
    ? {
        '.workspace-panel:last-of-type': {
          gridArea: 'z',
        },
      }
    : null
}

export const getWorkspaceStyles = (
  layout: string,
  workspace: MakerOptions['workspace']
) => {
  const styles = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    gridGap: 0,
    '.workspace-toolbar': {
      gridArea: 't',
    },
    '.workspace-panel': {
      gridArea: 'p',
    },
    '.workspace-canvas': {
      gridArea: 'c',
    },
    ...secondPanel(layout),
  }
  switch (layout) {
    case 'toolbar canvas':
      return {
        ...styles,
        gridTemplateRows: t => [
          `1fr`,
          `${t.sizes.height_workspace_toolbar} 1fr`,
        ],
        gridTemplateAreas: `"t" "c"`,
      }
    case 'toolbar panel canvas':
      return {
        ...styles,
        gridTemplateRows: t => [
          `1fr`,
          `${t.sizes.height_workspace_toolbar} 1fr`,
        ],
        gridTemplateAreas: `
        "t t"
        "p c"
        `,
      }
    case 'toolbar canvas panel':
      return {
        ...styles,
        gridTemplateRows: t => [
          `1fr`,
          `${t.sizes.height_workspace_toolbar} 1fr`,
        ],
        gridTemplateAreas: `
          "t t"
          "c p"
          `,
      }
    case 'toolbar panel canvas panel':
      return {
        ...styles,
        gridTemplateAreas: `
        "t t t"
        "p c z"
        `,
      }
    case 'canvas panel':
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          ` 1fr ${format(t.sizes.width_panel_right)}`,
        ],
        gridTemplateAreas: `"c p"`,
      }
    case 'panel canvas panel':
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr ${format(
            t.sizes.width_panel_right
          )}`,
        ],
        gridTemplateAreas: `"p c z"`,
      }
    case 'panel canvas':
    default:
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr`,
        ],
        gridTemplateAreas: `"p c"`,
      }
  }
}
