import * as React from 'react'

interface GridMenuProps {
  onChangeLayout: (layout: string) => void
  addColumn: () => void
  removeColumn: () => void
}

export const GridMenu: React.FC<GridMenuProps> = ({
  onChangeLayout,
  addColumn,
  removeColumn,
}) => {
  return (
    <div className="grid-menu">
      <button>-S-</button>
      <button
        onClick={() => {
          console.log('clicked')
          addColumn()
        }}>
        Add
      </button>
      <button onClick={() => removeColumn()}>Remove</button>
    </div>
  )
}
