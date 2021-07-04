import { Div, Link } from 'maker-ui'

import { EditIcon, FeedbackIcon } from './Icons'

interface SideButtonsProps {
  pathname: string
}

export const SideButtons = ({ pathname }: SideButtonsProps) => {
  return (
    <Div
      css={{
        marginTop: 30,
        '.side-link': {
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'var(--color-border)',
          padding: '12px 25px',
          marginBottom: 20,
          borderRadius: 3,
          fontSize: 14,
          color: 'var(--color-text)',
          transition: 'all ease 0.3s',
          '&:hover': {
            color: 'var(--color-link)',
            borderColor: 'var(--color-border_dark)',
            background: 'var(--color-bg_sideNav)',
            transform: 'translateX(5px)',
          },
          svg: {
            height: 17,
            fill: 'var(--color-primary)',
            marginRight: 15,
          },
        },
      }}>
      <Link
        href={`https://github.com/mdarche/maker-ui/tree/master/docs/src/pages${pathname}`}
        target="_blank"
        className="side-link">
        <EditIcon />
        Edit on GitHub
      </Link>
      <Link
        href="https://airtable.com/shru56kYph3qTgA0o"
        target="_blank"
        className="side-link">
        <FeedbackIcon />
        Feedback
      </Link>
    </Div>
  )
}
