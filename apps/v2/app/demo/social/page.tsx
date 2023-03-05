import { Section } from 'maker-ui'
import { SocialAccounts } from '@maker-ui/social'

export default function SocialPage() {
  return (
    <Section>
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com',
          facebook: 'https://facebook.com',
          instagram: 'https://facebook.com',
          youtube: 'https://facebook.com',
          website: 'https://facebook.com',
          linkedin: 'https://facebook.com',
          tiktok: 'https://facebook.com',
          discord: 'https://facebook.com',
        }}
      />
    </Section>
  )
}
