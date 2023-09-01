import { cleanObject, formatNumber, getCssVariables } from '@maker-ui/utils'
import { TableStyles } from './components'
import { PaginationStyles, SearchStyles } from './components/SmartTable/types'

const pageConfig = {
  pagination: {
    prefix: 'data-page',
    properties: [
      'margin',
      'fontSize',
      'fontFamily',
      'bg',
      'bgActive',
      'color',
      'colorActive',
      'iconFill',
      'iconHeight',
      'border',
      'borderActive',
      'borderRadius',
      'padding',
      'gap',
    ],
  },
}

export function searchVars(styles?: SearchStyles) {
  return getCssVariables(styles, {
    input: {
      prefix: 'data-search',
      properties: [
        'margin',
        'fontSize',
        'fontFamily',
        'bg',
        'color',
        'border',
        'borderRadius',
        'height',
        'minWidth',
      ],
    },
    icon: {
      prefix: 'data-search-icon',
      properties: ['fill', 'height'],
    },
    clear: {
      prefix: 'data-search-clear',
      properties: ['fill', 'height', 'padding', 'bg', 'borderRadius', 'border'],
    },
  })
}

export function tableVars(styles?: TableStyles) {
  const v = getCssVariables(styles, {
    table: {
      prefix: 'table',
      properties: ['borderColor', 'fontSize', 'fontFamily', 'bg'],
    },
    header: {
      prefix: 'table-th',
      properties: [
        'padding',
        'bg',
        'color',
        'top',
        'iconHeight',
        'iconWidth',
        'iconFill',
        'fontSize',
        'fontFamily',
      ],
    },
    cell: {
      prefix: 'table-td',
      properties: ['padding'],
    },
    row: {
      prefix: 'table-tr',
      properties: ['bgAlt', 'bgHover'],
    },
    export: {
      prefix: 'table-btn-export',
      properties: [
        'bg',
        'color',
        'fontFamily',
        'fontSize',
        'padding',
        'border',
        'borderRadius',
      ],
    },
    ...pageConfig,
  })
  return cleanObject({ ...v, ...(searchVars(styles?.search) || {}) })
}

export function paginationVars(styles?: PaginationStyles) {
  return getCssVariables(styles, pageConfig)
}

export function gridVars(columns: number | string, gap: number | string) {
  return cleanObject({
    '--data-grid-columns': formatNumber(columns, 'repeat(%, 1fr)'),
    '--data-grid-gap': formatNumber(gap),
  })
}
