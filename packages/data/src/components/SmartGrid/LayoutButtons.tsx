import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { GridIcon, RowIcon } from '@/icons'
import { useSmartGrid } from '@/hooks'
import { LayoutType } from './types'

interface LayoutButton {
  label: string
  value: LayoutType
  icon?: React.ReactNode
}

export interface LayoutButtonsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Optional icons to be displayed for the row and grid layout buttons.
   * If not provided, default icons will be used.
   */
  icons?: {
    /** Icon for the `row` layout button  */
    row: React.ReactNode
    /** Icon for the `grid` layout button  */
    grid: React.ReactNode
  }
  /**
   * Optional callback function that will be called when the layout type is changed.
   * The new layout type (either 'row' or 'grid') is passed as an argument to this function.
   */
  onChange?: (value: LayoutType) => void
  styles: {
    height: string | number
    width: string | number
    padding: string | number
    fill: string
    fillActive: string
    border: string
    borderActive: string
    background: string
    backgroundActive: string
  }
}

export const LayoutButtons = ({
  icons,
  onChange,
  className,
  ...props
}: LayoutButtonsProps) => {
  const { layout, setLayout } = useSmartGrid()

  const opts: LayoutButton[] = [
    { label: 'Row', value: 'row', icon: icons?.row || <RowIcon /> },
    { label: 'Grid', value: 'grid', icon: icons?.grid || <GridIcon /> },
  ]

  const onClick = (value: LayoutType) => {
    setLayout(value)
    onChange && onChange(value)
  }

  return (
    <div
      className={cn(['mkui-grid-layout flex align-center', className])}
      {...props}>
      {opts.map(({ label, value, icon }) => (
        <button
          key={value}
          role="switch"
          aria-checked={layout === value}
          title={label + ' layout'}
          onClick={() => onClick(value)}
          className={cn([
            'btn-layout flex align-center justify-center',
            layout === value ? 'active' : '',
          ])}>
          {icon}
        </button>
      ))}
    </div>
  )
}
