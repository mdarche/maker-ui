import * as React from 'react'
import styles from './cell.module.css'

interface GridCellProps {
  id?: string
}

export const GridCell = (props: GridCellProps) => {
  // Fetch child components from the context and render them in a container with a settings menu.
  return (
    <div className={styles.cell}>
      <span>Test</span>
    </div>
  )
}

const ColumnMenu = () => {
  return (
    <div className={styles.column_menu}>
      <button className={styles.columnButton}>Add Column</button>
      <button className={styles.columnButton}>Remove Column</button>
    </div>
  )
}
