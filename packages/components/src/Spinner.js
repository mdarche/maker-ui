import React from 'react'
import { Box, Spinner as DefaultSpinner, useThemeUI } from 'theme-ui'

const defaultColors = {
  primary: '#0e94d4',
  secondary: '#58c5fa',
  tertiary: '#9ad8f6',
}

const Spinner = React.forwardRef(
  ({ type = 'default', size = 80, colors = defaultColors, ...props }, ref) => {
    switch (type) {
      case 'pulse':
        return <Pulse ref={ref} size={size} colors={colors} {...props} />
      case 'scale':
        return <Scale ref={ref} size={size} colors={colors} {...props} />
      case 'rotate':
        return <Rotate ref={ref} size={size} colors={colors} {...props} />
      case 'blocks':
        return <Blocks ref={ref} size={size} colors={colors} {...props} />
      case 'default':
      default:
        return (
          <DefaultSpinner
            ref={ref}
            size={size}
            sx={{ color: colors.primary }}
            {...props}
          />
        )
    }
  }
)

const Blocks = ({
  size,
  colors: { primary, secondary, tertiary },
  ...props
}) => {
  const points = [
    { x: '9', y: '9', fill: primary, b1: '-1.83', b2: '-1.33' },
    { x: '34.8', y: '56', fill: secondary, b1: '-1.16', b2: '-0.66' },
    { x: '56', y: '9', fill: tertiary, b1: '-0.5', b2: '0' },
  ]

  const attributes = x => ({
    attributeName: x ? 'x' : 'y',
    dur: '2s',
    repeatCount: 'indefinite',
    keyTimes: '0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1',
    values: '9;56;56;56;56;9;9;9;9',
  })

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      sx={{ height: size, width: size }}
      {...props}>
      {points.map(({ x, y, fill, b1, b2 }, index) => (
        <Box
          key={index}
          as="rect"
          x={x}
          y={y}
          rx="1"
          ry="1"
          sx={{ fill, height: 35, width: 35 }}>
          <animate {...attributes(true)} begin={b1} />
          <animate {...attributes(false)} begin={b2} />
        </Box>
      ))}
    </Box>
  )
}

// Pulsing circles

const Pulse = ({ size, colors: { primary, secondary }, ...props }) => {
  const points = [
    { r: '24', begin: '-0.8', color: primary },
    { r: '39.6', begin: '0', color: secondary },
  ]

  const attributes = r => ({
    attributeName: r ? 'r' : 'opacity',
    repeatCount: 'indefinite',
    dur: '1.5s',
    values: r ? '0;40' : '1;0',
    keySplines: r ? '0 0.2 0.8 1' : '0.2 0 0.8 1',
    keyTimes: '0;1',
    calcMode: 'spline',
  })

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      sx={{ height: size, width: size }}
      {...props}>
      {points.map(({ color, begin, r }, index) => (
        <Box
          as="circle"
          key={index}
          cx="50"
          cy="50"
          r={r}
          sx={{ fill: 'none', stroke: color, strokeWidth: 3 }}>
          <animate {...attributes(true)} begin={begin} />
          <animate {...attributes(false)} begin={begin} />
        </Box>
      ))}
    </Box>
  )
}

// Three dots in row

const Scale = ({
  size,
  colors: { primary, secondary, tertiary },
  ...props
}) => {
  const points = [
    { translate: '25 50', scale: '.81144', begin: '-0.4166', color: primary },
    { translate: '50 50', scale: '.35566', begin: '-0.2083', color: secondary },
    { translate: '75 50', scale: '.01406', begin: '0', color: tertiary },
  ]

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      sx={{ width: size, height: size }}
      {...props}>
      {points.map(({ translate, scale, begin, color }, index) => (
        <g key={index} transform={`translate(${translate})`}>
          <Box
            as="circle"
            r="9"
            transform={`scale(${scale})`}
            sx={{ fill: color }}>
            <animateTransform
              attributeName="transform"
              type="scale"
              begin={`${begin}s`}
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1.25s"
              repeatCount="indefinite"
            />
          </Box>
        </g>
      ))}
    </Box>
  )
}

// Twelve dots in circle

const Rotate = ({ size, colors: { primary, secondary }, ...props }) => {
  const themeColors = useThemeUI().theme.colors
  const getThemeColor = val => (val in themeColors ? themeColors[val] : val)

  const p = getThemeColor(primary)
  const s = getThemeColor(secondary)

  const points = [
    { cx: '75', cy: '50', r: '3', begin: '-0.9166' },
    { cx: '71.651', cy: '62.5', r: '3', begin: '-0.8333' },
    { cx: '62.5', cy: '71.651', r: '3', begin: '-0.75' },
    { cx: '50', cy: '75', r: '3', begin: '-0.6666' },
    { cx: '37.5', cy: '71.651', r: '3', begin: '-0.5833' },
    { cx: '28.349', cy: '62.5', r: '3.269', begin: '-0.5' },
    { cx: '25', cy: '50', r: '3.936', begin: '-0.4166' },
    { cx: '28.349', cy: '37.5', r: '4.602', begin: '-0.3333' },
    { cx: '37.5', cy: '28.349', r: '4.731', begin: '-0.25' },
    { cx: '50', cy: '25', r: '4.064', begin: '-0.1666' },
    { cx: '62.5', cy: '28.349', r: '3.398', begin: '-0.0833' },
    { cx: '71.651', cy: '37.5', r: '3', begin: '0' },
  ]

  const attributes = r => ({
    attributeName: r ? 'r' : 'fill',
    values: r ? '3;3;5;3;3' : `${s};${s};${p};${s};${s};`,
    repeatCount: 'indefinite',
    dur: '1s',
  })

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      sx={{ height: size, width: size }}
      {...props}>
      {points.map(({ cy, cx, r, begin }, index) => (
        <circle key={index} cx={cx} cy={cy} fill={secondary} r={r}>
          <animate {...attributes(true)} begin={begin} />
          <animate {...attributes(false)} begin={begin} />
        </circle>
      ))}
    </Box>
  )
}

export default Spinner
