import * as React from 'react'
import { cn } from '@maker-ui/utils'

export interface ArrowProps {
  onClick?: (...args: any) => any
  direction: string
  className?: string
  custom?: string | React.ReactNode
  ref?: React.Ref<HTMLButtonElement>
}

export const Arrow = React.forwardRef<HTMLButtonElement, ArrowProps>(
  ({ onClick, direction, className, custom }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(['mkui_carousel_arrow', direction, className])}
        onClick={onClick}
        data-direction={direction}>
        {custom ?? (
          <svg viewBox="0 0 39 70" className="default-arrow">
            <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
          </svg>
        )}
      </button>
    )
  }
)
