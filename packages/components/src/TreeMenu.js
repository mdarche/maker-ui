import React, { useState, useRef, useEffect } from 'react'
import { Box } from 'theme-ui'
import ResizeObserver from 'resize-observer-polyfill'
import { useSpring, animated as a } from 'react-spring'

// Helpers

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}

// Components

const Tree = React.memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  })

  // const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

  return (
    <Box
      sx={{
        position: 'relative',
        pt: '4px',
        textOverflow: 'ellipsis',
        whiteSpace: 'no-wrap',
        overflowX: 'hidden',
        verticalAlign: 'middle',
      }}>
      <button onClick={() => setOpen(!isOpen)}>
        action
        {/* {children ? (isOpen ? '-' : '+') : 'x'} */}
      </button>
      <Box as="span" style={style}>
        {name}
      </Box>
      <a.div
        style={{
          willChange: 'opacity, transform, height',
          marginLeft: 6,
          paddingBottom: 15,
          overflow: 'hidden',
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </a.div>
    </Box>
  )
})

const TreeMenu = React.forwardRef((props, ref) => {
  return (
    <Tree name="main" defaultOpen>
      <Tree name="hello" />
      <Tree name="subtree with children">
        <Tree name="hello" />
        <Tree name="sub-subtree with children">
          <Tree name="child 1" style={{ color: '#37ceff' }} />
          <Tree name="child 2" style={{ color: '#37ceff' }} />
          <Tree name="child 3" style={{ color: '#37ceff' }} />
          <Tree name="custom content">
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 200,
                padding: 10,
              }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'black',
                  borderRadius: 5,
                }}
              />
            </div>
          </Tree>
        </Tree>
        <Tree name="hello" />
      </Tree>
      <Tree name="world" />
      <Tree name={<span>🙀 something something</span>} />
    </Tree>
  )
})

export default TreeMenu
