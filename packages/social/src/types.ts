export type LinkType =
  | string
  | { url: string; icon: string | React.ReactElement }

type DefaultPlatforms =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'youtube'
  | 'tiktok'
  | 'linkedin'
  | 'website'

export interface AccountLinks {
  [key: string | DefaultPlatforms]: LinkType | undefined
}
