import { cleanObject, formatNumber } from '@maker-ui/utils'
import { TableStyles } from './components'
import { PaginationStyles, SearchStyles } from './components/SmartTable/types'

export function tableVariables(styles?: TableStyles) {
  const pagination = paginationVariables(styles?.pagination)
  const search = searchVariables(styles?.search)
  return cleanObject({
    // Table
    '--smart-table-font-size': formatNumber(styles?.table?.fontSize),
    '--smart-table-font-family': styles?.table?.fontFamily,
    '--smart-table-border-color': styles?.table?.borderColor,
    // Table cell
    '--smart-table-cell-padding': formatNumber(styles?.cell?.padding),
    // Table header
    '--smart-table-header-color': styles?.header?.color,
    '--smart-table-header-padding': formatNumber(styles?.header?.padding),
    '--smart-table-header-bg': styles?.header?.background,
    '--smart-table-header-top': formatNumber(styles?.header?.top),
    '--smart-table-header-font-family': styles?.header?.fontFamily,
    '--smart-table-header-font-size': formatNumber(styles?.header?.fontSize),
    '--smart-table-header-icon-height': formatNumber(
      styles?.header?.iconHeight
    ),
    '--smart-table-header-icon-fill': formatNumber(styles?.header?.iconFill),
    // Table row
    '--smart-table-alt-row-bg': styles?.row?.altBackground,
    '--smart-table-row-hover-bg': styles?.row?.hoverBackground,
    // Export button
    '--smart-table-btn-export-bg': styles?.export?.background,
    '--smart-table-btn-export-color': styles?.export?.color,
    '--smart-table-btn-export-font-family': styles?.export?.fontFamily,
    '--smart-table-btn-export-font-size': formatNumber(
      styles?.export?.fontSize
    ),
    '--smart-table-btn-export-padding': formatNumber(styles?.export?.padding),
    '--smart-table-btn-export-border': styles?.export?.border,
    '--smart-table-btn-export-border-radius': formatNumber(
      styles?.export?.borderRadius
    ),
    ...(pagination || {}),
    ...(search || {}),
  })
}

export function paginationVariables(styles?: PaginationStyles) {
  return cleanObject({
    '--data-pagination-font-family': styles?.fontFamily,
    '--data-pagination-font-size': formatNumber(styles?.fontSize),
    '--data-pagination-bg-active': styles?.backgroundActive,
    '--data-pagination-bg': styles?.background,
    '--data-pagination-color-active': styles?.colorActive,
    '--data-pagination-color': styles?.color,
    '--data-pagination-icon-fill': styles?.iconFill,
    '--data-pagination-icon-height': formatNumber(styles?.iconHeight),
    '--data-pagination-border': styles?.border,
    '--data-pagination-border-active': styles?.borderActive,
    '--data-pagination-border-radius': formatNumber(styles?.borderRadius),
    '--data-pagination-padding': formatNumber(styles?.padding),
    '--data-pagination-gap': formatNumber(styles?.gap),
    '--data-pagination-hover-bg': styles?.hoverBackground,
    '--data-pagination-hover-color': styles?.hoverColor,
    '--data-pagination-hover-border': styles?.hoverBorder,
  })
}

export function searchVariables(styles?: SearchStyles) {
  return cleanObject({
    // Input & Container
    '--data-search-font-family': styles?.input?.fontFamily,
    '--data-search-font-size': formatNumber(styles?.input?.fontSize),
    '--data-search-bg': styles?.input?.background,
    '--data-search-color': styles?.input?.color,
    '--data-search-border': styles?.input?.border,
    '--data-search-border-radius': formatNumber(styles?.input?.borderRadius),
    '--data-search-height': formatNumber(styles?.input?.height),
    '--data-search-min-width': formatNumber(styles?.input?.minWidth),
    // Search Icon
    '--data-search-icon-fill': styles?.icon?.fill,
    '--data-search-icon-height': formatNumber(styles?.icon?.height),
    // Clear button
    '--data-search-clear-bg': styles?.clear?.background,
    '--data-search-clear-fill': styles?.clear?.fill,
    '--data-search-clear-height': formatNumber(styles?.clear?.height),
    '--data-search-clear-padding': formatNumber(styles?.clear?.padding),
    '--data-search-clear-border': styles?.clear?.border,
    '--data-search-clear-border-radius': formatNumber(
      styles?.clear?.borderRadius
    ),
  })
}

export function gridVariables(columns: number | string, gap: number | string) {
  return cleanObject({
    '--smart-grid-columns': formatNumber(columns, 'repeat(%, 1fr)'),
    '--smart-grid-gap': formatNumber(gap),
  })
}
