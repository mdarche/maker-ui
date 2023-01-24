import * as React from 'react'
import { cn, generateId } from '@maker-ui/utils'
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
import { getStyles } from './styles'

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

export interface ColorConfig {
  default: ResponsiveString
  active: ResponsiveString
}

type SocialLogos = {
  [K in Account]: { icon: JSX.Element; label: string; root?: string }
}

export interface SocialAccountsProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'color'> {
  accounts: AccountLinks
  iconSize?: number | string
  spacing?: number | string
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

// TODO - add support for custom accounts and BYO icons

export const SocialAccounts = ({
  accounts,
  color,
  ...props
}: SocialAccountsProps) => {
  const id = generateId()
  const styles = getStyles(id, { ...props, color })
  return accounts ? (
    <>
      <style id={`mkui-css-${id}`}>{styles}</style>
      <ul className={cn([`mkui-${id}`, 'social-accounts'])} {...props}>
        {Object.keys(accounts).map((key) =>
          // @ts-ignore
          accounts[key] === null || !accounts[key].length ? null : (
            <li key={key}>
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
      </ul>
    </>
  ) : null
}

SocialAccounts.displayName = 'SocialAccounts'
