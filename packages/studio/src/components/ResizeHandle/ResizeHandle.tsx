import { cn } from '@maker-ui/utils'
import { extractPxValue, handleMouseDown, positionMap } from '../Grid/utils'
import { GridAction } from '../Grid/Grid'

interface ResizeHandleProps {
  padding: string
  margin: string
  dispatch: React.Dispatch<GridAction>
}

export const ResizeHandle = ({
  padding,
  margin,
  dispatch,
}: ResizeHandleProps) => {
  return (
    <div className="grid-box">
      {padding?.split(' ').map((v, i) => {
        const pos = positionMap[i]
        const num = extractPxValue(v)
        return (
          <div
            key={pos}
            className={cn([
              'resize-padding',
              'flex align-center justify-center',
              pos,
            ])}
            onMouseDown={(e) =>
              handleMouseDown(e, i, 'padding', padding, dispatch)
            }
            style={{
              height: pos === 'top' || pos === 'bottom' ? v : undefined,
              width: pos === 'left' || pos === 'right' ? v : undefined,
            }}>
            <span
              className={cn([
                typeof num === 'number' &&
                num <= 20 &&
                (pos === 'left' || pos === 'right')
                  ? 'abs'
                  : undefined,
              ])}
              onMouseDown={(e) =>
                handleMouseDown(e, i, 'padding', padding, dispatch)
              }>
              {v}
            </span>
          </div>
        )
      })}
    </div>
  )
}
