import * as React from 'react'
import {
  XIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
  FacebookIcon,
  TiktokIcon,
  WebsiteIcon,
} from './svgr'

export const logos = [
  {
    key: 'twitter',
    icon: <XIcon />,
    root: 'https://x.com/',
  },
  {
    key: 'tiktok',
    icon: <TiktokIcon />,
    root: 'https://tiktok.com/@',
  },
  {
    key: 'instagram',
    icon: <InstagramIcon />,
    root: 'https://instagram.com/',
  },
  {
    key: 'facebook',
    icon: <FacebookIcon />,
    root: 'https://facebook.com/',
  },
  {
    key: 'youtube',
    icon: <YoutubeIcon />,
    root: 'https://youtube.com/channel/',
  },
  {
    key: 'linkedin',
    icon: <LinkedinIcon />,
    root: 'https://linkedin.com/in/',
  },
  { key: 'website', icon: <WebsiteIcon /> },
]
