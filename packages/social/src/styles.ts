import { ColorConfig, SocialAccountsProps } from './SocialAccounts'

const format = (s: string | number) => (typeof s === 'string' ? s : `${s}px`)

export function getStyles(
  id: string,
  {
    iconSize = 22,
    spacing = 10,
    vertical = false,
    justify = 'left',
    color,
    trim = false,
    trimFirst = false,
    trimLast = false,
  }: Omit<SocialAccountsProps, 'accounts'>
): string {
  const isColorObject = typeof color === 'object'
  const base = `.mkui-${id}`
  const size = format(iconSize)
  const padding = format(spacing)
  const obj = {
    [base]: {
      display: !vertical ? 'flex' : undefined,
      'list-style-type': 'none',
      'justify-content':
        justify === 'right'
          ? 'flex-end'
          : justify === 'center'
          ? 'center'
          : undefined,
      padding: 0,
    },
    [base + ' svg']: {
      height: size,
      width: size,
      fill: isColorObject ? (color as ColorConfig)?.default : color,
      transition: 'fill ease 0.3s',
    },
    [base + ' a']: {
      display: 'block',
      'padding-left': padding,
      'padding-right': padding,
    },
    [base + ' a:hover svg']: {
      fill: isColorObject ? (color as ColorConfig)?.active : undefined,
    },
    [base + ' li:first-of-type a']: {
      'padding-left': trim || trimFirst ? 0 : undefined,
    },
    [base + ' li:last-of-type a']: {
      'padding-right': trim || trimLast ? 0 : undefined,
    },
  }
  return makeCSS(obj)
}

function makeCSS(styles: { [key: string]: { [key: string]: any } }): string {
  let cssString = ''
  for (const key in styles) {
    cssString += `${key} {`
    const innerStyles = styles[key]
    for (const innerKey in innerStyles) {
      if (innerStyles[innerKey]) {
        cssString += `${innerKey}: ${innerStyles[innerKey]};`
      }
    }
    cssString += '}'
  }
  return cssString
}
