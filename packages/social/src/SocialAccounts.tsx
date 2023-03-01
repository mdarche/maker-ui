import * as React from 'react'
import { cn, generateId, merge } from '@maker-ui/utils'
import { Style, type MakerCSS } from '@maker-ui/style'

import { AccountLinks, LinkType } from './types'
import { logos } from './defaults'

export interface SocialAccountsProps
  extends MakerCSS,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** A dictionary of social media accounts to display */
  accounts: AccountLinks
  /** The size of the social media icons. Can be a responsive value.
   * @default 22
   */
  iconSize?: number | string | (number | string)[]
  /** The spacing between the icons. Can be a responsive value.
   * @default 10
   */
  spacing?: number | string | (number | string)[]
  /** If true, the icon list will be verticial.
   * @default false
   */
  vertical?: boolean
  /** The flex justification of the social media icons
   * @default 'left'
   */
  justify?: 'center' | 'left' | 'right'
  /** Determines how to handle padding on both ends of the icon list.
   * If true, the first and last icons will be trimmed.
   * @default false
   * */
  trim?: boolean | 'last' | 'first'
  /** The fill color of the social media icons. You can supply an object that
   * specifies the default and active / hover colors for the icons.
   */
  color?:
    | string
    | {
        default: string
        active: string
      }
}

/**
 * The SocialAccounts component displays a list of social media links vertically or horizontally
 * with easy access to padding and fill colors. The component accepts a list of accounts and
 * includes predefined icons for:
 *
 * - Twitter
 * - Instagram
 * - TikTok
 * - YouTube
 * - Facebook
 * - LinkedIn
 * - Website
 *
 * You can also supply your own icons and social links.
 */
export const SocialAccounts = ({
  accounts,
  breakpoints,
  mediaQuery,
  color,
  css = {},
  iconSize = 22,
  justify = 'left',
  spacing = 10,
  trim = false,
  vertical = false,
  ...props
}: SocialAccountsProps) => {
  const styleId = generateId()
  const trimType = trim === true ? 'all' : trim
  const isColorObject = typeof color === 'object'
  const leading = trimType === 'all' || trimType === 'first' ? 0 : undefined
  const trailing = trimType === 'all' || trimType === 'last' ? 0 : undefined

  return accounts ? (
    <div className={cn(['mkui-social-accounts', styleId])} {...props}>
      <Style
        root={styleId}
        mediaQuery={mediaQuery}
        breakpoints={breakpoints}
        css={merge(
          {
            ul: {
              flexDirection: vertical ? 'column' : undefined,
              justifyContent:
                justify === 'right'
                  ? 'flex-end'
                  : justify === 'center'
                  ? 'center'
                  : undefined,
              alignItems: justify === 'center' ? 'center' : undefined,
              listStyleType: 'none',
              padding: 0,
              margin: 0,
            },
            svg: {
              height: iconSize,
              width: iconSize,
              fill: isColorObject ? color?.default : color,
              transition: 'fill ease 0.3s',
            },
            'li:first-of-type a': {
              paddingTop: vertical ? leading : undefined,
              paddingLeft: !vertical ? leading : undefined,
            },
            'li:last-of-type a': {
              paddingBottom: vertical ? trailing : undefined,
              paddingRight: !vertical ? trailing : undefined,
            },
            a: {
              display: 'block',
              paddingTop: vertical ? spacing : undefined,
              paddingBottom: vertical ? spacing : undefined,
              paddingLeft: !vertical ? spacing : undefined,
              paddingRight: !vertical ? spacing : undefined,
              '&:hover svg': {
                svg: {
                  fill: isColorObject ? color?.active : undefined,
                },
              },
            },
          },
          css
        )}
      />
      <ul className="mkui-icon-list inline-flex">
        {Object.keys(accounts).map((key) => (
          <SocialIcon
            key={key}
            name={key}
            account={accounts[key] as LinkType}
          />
        ))}
      </ul>
    </div>
  ) : null
}

interface SocialIconProps {
  name: string
  account: LinkType
}

const SocialIcon = ({ name, account }: SocialIconProps) => {
  const link = typeof account === 'string' ? account : account.url
  const match = logos.find((d) => d.key === name)
  const url = link.startsWith('http')
    ? link
    : match
    ? `${match?.root}${link.replace('@', '').trim()}`
    : undefined
  const icon =
    typeof account === 'object' ? account.icon : match ? match.icon : undefined

  return url && icon ? (
    <li className="mkui-social-link">
      <a href={url} target="_blank" rel="noreferrer">
        <div className="mkui-icon-wrapper flex align-center justify-center">
          {icon}
        </div>
      </a>
    </li>
  ) : null
}

SocialAccounts.displayName = 'SocialAccounts'
