import * as React from 'react'
import { cleanObject, cn } from '@maker-ui/utils'
import { useSmartGrid } from '@/hooks'
// Set up Dot syntax
import { AccordionMenu } from './AccordionMenu'
import { SmartGridProvider } from './Provider'
import { ActiveFilters } from './ActiveFilters'
import { GridSearch } from './GridSearch'
import { FilterGroup } from './FilterGroup'
import { SortButton } from './SortButton'
import { LayoutButtons } from './LayoutButtons'
import { gridVars } from '../../variables'

interface DataGridProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A function that defines how to render each item in a row layout.
   * This function is called for each item in the data array.
   * @param row - The item to be rendered.
   */
  renderRow?: (row: T) => React.ReactNode
  /**
   * A function that defines how to render each item in a grid layout.
   * This function is called for each item in the data array.
   * @param row - The item to be rendered.
   */
  renderGrid?: (row: T) => React.ReactNode
  /**
   * The gap between items in the grid.
   * Can be a number (representing pixels) or a string (for other units).
   */
  gap?: string | number
  /**
   * The number of columns in the grid.
   * Can be a number (representing the exact number of columns) or a string (for other units or complex layouts).
   */
  columns?: string | number
  /**
   * The content to display while data is being loaded.
   * Can be a string or a React element.
   */
  loadingIndicator?: string | React.ReactElement
  /**
   * The content to display when there is no data.
   * Can be a string or a React element.
   */
  noData?: string | React.ReactElement
}

export const SmartGrid = <T,>({
  renderRow,
  renderGrid,
  gap = 20,
  columns = 3,
  loadingIndicator = 'Loading...',
  noData = 'No data found.',
  className,
  ...props
}: DataGridProps<T>) => {
  const { isLoading, data, layout } = useSmartGrid()
  const variables = gridVars(columns, gap)

  return (
    <div
      className={cn(['mkui-data-grid', layout, className])}
      {...props}
      style={cleanObject({
        ...(variables || {}),
        ...(props.style || {}),
      })}>
      {isLoading
        ? loadingIndicator
        : data?.length
        ? data.map((item) =>
            layout === 'grid' && renderGrid ? (
              <React.Fragment key={item.id}>{renderGrid(item)}</React.Fragment>
            ) : renderRow ? (
              <React.Fragment key={item.id}>{renderRow(item)}</React.Fragment>
            ) : null
          )
        : noData}
    </div>
  )
}

SmartGrid.Search = GridSearch
SmartGrid.AccordionMenu = AccordionMenu
SmartGrid.Provider = SmartGridProvider
SmartGrid.ActiveFilters = ActiveFilters
SmartGrid.FilterGroup = FilterGroup
SmartGrid.SortButton = SortButton
SmartGrid.LayoutButtons = LayoutButtons
