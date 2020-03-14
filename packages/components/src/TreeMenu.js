import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure, usePrevious } from './helper'
import { MinusIcon, PlusIcon, CloseIcon } from './icons'

const Tree = React.memo(({ children, name, style, open = false }) => {
  const [isOpen, setOpen] = useState(open)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const { height } = useSpring({
    from: { height: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
    },
  })

  return (
    <Box
      className="tree-item"
      sx={{
        position: 'relative',
        pt: '5px',
        pl: '5px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
      }}>
      <Box
        as="button"
        onClick={() => setOpen(!isOpen)}
        sx={{
          background: 'none',
          border: 'none',
          p: 0,
          mr: '10px',
          cursor: 'pointer',
          color: 'primary',
          svg: {
            height: '16px',
            fill: 'currentColor',
          },
          verticalAlign: 'middle',
        }}>
        {children ? isOpen ? <MinusIcon /> : <PlusIcon /> : <CloseIcon />}
      </Box>
      <Box as="span" style={style}>
        {name}
      </Box>
      <a.div
        style={{
          willChange: 'height',
          paddingLeft: 10,
          overflow: 'hidden',
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}>
        <Box {...bind}>{children}</Box>
      </a.div>
    </Box>
  )
})

const TreeMenu = React.forwardRef(({ variant = 'tree', ...props }, ref) => {
  return (
    <Box ref={ref} variant={variant} {...props}>
      <Tree name="main" open>
        <Tree name="hello" />
        <Tree name="subtree with children">
          <Tree name="hello" />
          <Tree name="sub-subtree with children">
            <Tree name="child 1" />
            <Tree name="child 2" />
            <Tree name="child 3" />
            <Tree name="custom content">
              <div>Test!</div>
            </Tree>
          </Tree>
          <Tree name="hello" />
        </Tree>
        <Tree name="world" />
        <Tree name={<span>something something</span>} />
      </Tree>
    </Box>
  )
})

export default TreeMenu
