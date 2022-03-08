import { SVG, SVGProps } from 'maker-ui'

const defaultColors = {
  primary: '#0e94d4',
  secondary: '#58c5fa',
  tertiary: '#9ad8f6',
}

export interface SpinnerProps extends SVGProps {
  /** All prebuilt spinner types */
  type: 'default' | 'pulse' | 'rotate' | 'blocks' | 'scale'
  /** A number in pixels that will determine the width and height of the spinner.
   * Each spinner is a perfect square.
   */
  size: number
  /** A dictionary of colors that are applied to various parts of each Spinner SVG */
  colors: {
    primary: string
    secondary: string
    tertiary: string
  }
}

interface SpinnerSVGProps extends Omit<SpinnerProps, 'type'> {}

/**
 * The `Spinner` component gives you easy access to 5 common loading indicators for a better
 * user experience during network requests.
 *
 * @todo add react-transition-group to this component for smooth entry and exit
 * @todo refactor and remove the css repetition
 *
 * @link https://maker-ui.com/docs/elements/spinner
 */
export const Spinner = ({
  type = 'default',
  size = 80,
  colors = defaultColors,
  css,
  ...props
}: Partial<SpinnerProps>) => {
  switch (type) {
    case 'pulse':
      return (
        <Pulse
          size={size}
          colors={colors}
          css={{ ...(css as object) }}
          {...props}
        />
      )
    case 'rotate':
      return (
        <Rotate
          size={size}
          colors={colors}
          css={{ ...(css as object) }}
          {...props}
        />
      )
    case 'blocks':
      return (
        <Blocks
          size={size}
          colors={colors}
          css={{ ...(css as object) }}
          {...props}
        />
      )
    case 'scale':
    default:
      return (
        <Scale
          size={size}
          colors={colors}
          css={{ ...(css as object) }}
          {...props}
        />
      )
  }
}

Spinner.displayName = 'Spinner'

// Blocks

const Blocks = ({
  size,
  colors: { primary, secondary, tertiary },
  css,
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { x: '9', y: '9', fill: primary, b1: '-1.83', b2: '-1.33' },
    { x: '34.8', y: '56', fill: secondary, b1: '-1.16', b2: '-0.66' },
    { x: '56', y: '9', fill: tertiary, b1: '-0.5', b2: '0' },
  ]

  const getAttributes = (x: boolean) => ({
    attributeName: x ? 'x' : 'y',
    dur: '2s',
    repeatCount: 'indefinite',
    keyTimes: '0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1',
    values: '9;56;56;56;56;9;9;9;9',
  })

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {points.map(({ x, y, fill, b1, b2 }, index) => (
        <rect
          key={index}
          x={x}
          y={y}
          rx="1"
          ry="1"
          style={{ fill, height: 35, width: 35 }}>
          <animate {...getAttributes(true)} begin={b1} />
          <animate {...getAttributes(false)} begin={b2} />
        </rect>
      ))}
    </SVG>
  )
}

// Pulse

const Pulse = ({
  size,
  colors: { primary, secondary },
  css,
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { r: '24', begin: '-0.8', color: primary },
    { r: '39.6', begin: '0', color: secondary },
  ]

  const getAttributes = (r: boolean) => ({
    attributeName: r ? 'r' : 'opacity',
    repeatCount: 'indefinite',
    dur: '1.5s',
    values: r ? '0;40' : '1;0',
    keySplines: r ? '0 0.2 0.8 1' : '0.2 0 0.8 1',
    keyTimes: '0;1',
    calcMode: 'spline',
  })

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {points.map(({ color, begin, r }, index) => (
        <circle
          key={index}
          cx="50"
          cy="50"
          r={r}
          style={{ fill: 'none', stroke: color, strokeWidth: 3 }}>
          <animate {...getAttributes(true)} begin={begin} />
          <animate {...getAttributes(false)} begin={begin} />
        </circle>
      ))}
    </SVG>
  )
}

// Scale - 3 dots in a row

const Scale = ({
  size,
  colors: { primary, secondary, tertiary },
  css,
  ...props
}: SpinnerSVGProps) => {
  const points = [
    { translate: '25 50', scale: '.81144', begin: '-0.4166', color: primary },
    { translate: '50 50', scale: '.35566', begin: '-0.2083', color: secondary },
    { translate: '75 50', scale: '.01406', begin: '0', color: tertiary },
  ]

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ width: size, height: size, ...(css as object) }}
      {...props}>
      {points.map(({ translate, scale, begin, color }, index) => (
        <g key={index} transform={`translate(${translate})`}>
          <circle r="9" transform={`scale(${scale})`} style={{ fill: color }}>
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
          </circle>
        </g>
      ))}
    </SVG>
  )
}

// Circular Dots

const Rotate = ({
  size,
  colors: { primary, secondary },
  css,
  ...props
}: SpinnerSVGProps) => {
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

  const getAttributes = (r: boolean) => ({
    attributeName: r ? 'r' : 'fill',
    values: r
      ? '3;3;5;3;3'
      : `${secondary};${secondary};${primary};${secondary};${secondary};`,
    repeatCount: 'indefinite',
    dur: '1s',
  })

  return (
    <SVG
      viewBox="0 0 100 100"
      css={{ height: size, width: size, ...(css as object) }}
      {...props}>
      {points.map(({ cy, cx, r, begin }, index) => (
        <circle key={index} cx={cx} cy={cy} fill={secondary} r={r}>
          <animate {...getAttributes(true)} begin={begin} />
          <animate {...getAttributes(false)} begin={begin} />
        </circle>
      ))}
    </SVG>
  )
}
