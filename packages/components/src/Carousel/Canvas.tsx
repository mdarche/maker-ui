import * as React from 'react'
import { Div } from 'maker-ui'
import { SpringConfig, useTransition } from 'react-spring'

const getTransition = (type, next) => {
  switch (type) {
    case 'fade':
      return {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      }
    case 'slide-fade':
      return {
        from: {
          opacity: 0,
          transform: `translate3d(${next ? '50%' : '-50%'},0,0)`,
        },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: {
          opacity: 0,
          transform: `translate3d(${next ? '-100%' : '100%'},0,0)`,
        },
      }
    case 'slide':
    default:
      return {
        from: { transform: `translate3d(${next ? '50%' : '-50%'},0,0)` },
        enter: { transform: 'translate3d(0%,0,0)' },
        leave: { transform: `translate3d(${next ? '-100%' : '100%'},0,0)` },
      }
  }
}

interface CanvasProps {
  currentIndex: number
  slides?: any
  transition?: 'slide' | 'fade' | 'slide-fade'
  config?: SpringConfig
  next?: boolean
}

/**
 * The `Canvas` component creates an animated div for paging through
 * the carousel slides.
 *
 * @internal usage only
 */

export const Canvas = React.memo(
  ({ slides, transition, currentIndex, config, next }: CanvasProps) => {
    const transitions = useTransition(currentIndex, {
      ...getTransition(transition, next),
      // @ts-ignore
      config,
    })

    return (
      <Div
        sx={{
          position: 'relative',
          zIndex: 0,
          mx: 'auto',
          height: '100%',
          width: '100%',
          '.slide': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
          },
        }}>
        {transitions((props, item) => {
          const Page = slides[item]
          // @ts-ignore
          return <Page style={props} />
        })}
      </Div>
    )
  }
)

Canvas.displayName = 'CarouselCanvas'
