import { Section } from '@maker-ui/layout'
import { Style } from '@maker-ui/style'
// import { Accordion } from '@maker-ui/accordion'

export default function SocialPage() {
  return (
    <Section>
      <Style
        root="accordion"
        css={{
          '&:hover svg': {
            color: ['blue', 'red'],
          },
          summary: { cursor: 'pointer', '&::marker': { content: 'none' } },
          p: { transition: 'all ease 0.3s' },
        }}
      />
      <div className="accordion">
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
        <details>
          <summary>Panel</summary>
          <p>Here is the content that is open by default!</p>
        </details>
      </div>
    </Section>
  )
}
