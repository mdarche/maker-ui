import * as React from 'react'
import { UList, type UListProps } from '@maker-ui/primitives'
import {
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
  FacebookIcon,
  DiscordIcon,
  TiktokIcon,
  WebsiteIcon,
} from './svgr'

interface AccountLinks {
  twitter?: string
  instagram?: string
  youtube?: string
  website?: string
  linkedin?: string
  tiktok?: string
  facebook?: string
  discord?: string
}

export type Account =
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'facebook'
  | 'linkedin'
  | 'discord'
  | 'website'

type ResponsiveString = string | string[]

interface ColorConfig {
  default: ResponsiveString
  active: ResponsiveString
}

type SocialLogos = {
  [K in Account]: { icon: JSX.Element; label: string; root?: string }
}

interface SocialAccountsProps extends Omit<UListProps, 'color'> {
  accounts: AccountLinks
  iconSize?: number | number[]
  spacing?: number | number[]
  vertical?: boolean
  justify?: 'center' | 'left' | 'right'
  trim?: boolean
  trimLast?: boolean
  trimFirst?: boolean
  color?: ResponsiveString | ColorConfig
}

export const socialLogos: SocialLogos = {
  twitter: {
    icon: <TwitterIcon />,
    label: 'Twitter',
    root: 'https://twitter.com/',
  },
  tiktok: {
    icon: <TiktokIcon />,
    label: 'TikTok',
    root: 'https://tiktok.com/@',
  },
  instagram: {
    icon: <InstagramIcon />,
    label: 'Instagram',
    root: 'https://instagram.com/',
  },
  facebook: {
    icon: <FacebookIcon />,
    label: 'Facebook',
    root: 'https://facebook.com/',
  },
  youtube: {
    icon: <YoutubeIcon />,
    label: 'YouTube',
    root: 'https://youtube.com/channel/',
  },
  discord: {
    icon: <DiscordIcon />,
    label: 'Discord',
    root: 'https://discordapp.com/users/',
  },
  linkedin: {
    icon: <LinkedinIcon />,
    label: 'LinkedIn',
    root: 'https://linkedin.com/in/',
  },
  website: { icon: <WebsiteIcon />, label: 'Website' },
}

function formatSocialURL(val?: string, account?: Account) {
  if (!val || !account) return ''
  const clean = val.replace('@', '').trim()
  return val.startsWith('http') ? val : `${socialLogos[account].root}${clean}`
}

export const SocialAccounts = ({
  accounts,
  css,
  iconSize = 22,
  spacing = 10,
  vertical = false,
  justify = 'left',
  color,
  trim = false,
  trimFirst = false,
  trimLast = false,
  ...props
}: SocialAccountsProps) => {
  const isColorObject = typeof color === 'object'
  return accounts ? (
    <UList
      className="social-accounts"
      css={{
        display: !vertical ? 'flex' : undefined,
        listStyleType: 'none',
        justifyContent:
          justify === 'right'
            ? 'flex-end'
            : justify === 'center'
            ? 'center'
            : undefined,
        padding: 0,
        svg: {
          height: iconSize,
          width: iconSize,
          fill: isColorObject ? (color as ColorConfig)?.default : color,
          transition: 'fill ease 0.3s',
        },
        a: {
          display: 'block',
          paddingLeft: spacing,
          paddingRight: spacing,
          ...(isColorObject
            ? { '&:hover svg': { fill: (color as ColorConfig)?.active } }
            : {}),
        },
        'li:first-of-type a':
          trim || trimFirst
            ? {
                paddingLeft: 0,
              }
            : undefined,
        'li:last-of-type a':
          trim || trimLast
            ? {
                paddingRight: 0,
              }
            : undefined,
        ...(css as object),
      }}
      {...props}>
      {Object.keys(accounts).map((key) =>
        // @ts-ignore
        accounts[key] === null || !accounts[key].length ? null : (
          <li key={key}>
            {/* @ts-ignore */}
            <a
              href={formatSocialURL(accounts[key as Account], key as Account)}
              target="_blank"
              rel="noreferrer">
              <div className="icon-wrapper flex align-center">
                {socialLogos[key as Account].icon}
              </div>
            </a>
          </li>
        )
      )}
    </UList>
  ) : null
}

SocialAccounts.displayName = 'SocialAccounts'
