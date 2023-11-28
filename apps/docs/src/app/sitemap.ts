import { MetadataRoute } from 'next'
import { sideMenu } from '@/menus'
import { flattenMenu } from '@/utils'

const siteLinks = flattenMenu(sideMenu).map((item) => ({
  url: `https://maker-ui.com${item.path}`,
  lastModified: new Date(),
}))

export default function sitemap(): MetadataRoute.Sitemap {
  return siteLinks
}
