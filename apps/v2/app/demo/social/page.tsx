import { Section } from '@maker-ui/layout'
import { SocialAccounts } from '@maker-ui/social'

export default function SocialPage() {
  return (
    <Section>
      <SocialAccounts
        accounts={{
          twitter: 'https://twitter.com',
          facebook: 'https://facebook.com',
        }}
      />
    </Section>
  )
}
