import { Div } from 'maker-ui'

import { EditIcon } from './Icons'

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
            height: 16,
            fill: 'var(--color-primary)',
            marginRight: 15,
          },
        },
      }}>
      <a
        href={`https://github.com/mdarche/maker-ui/tree/master/docs/src/pages${pathname}`}
        target="_blank"
        rel="noopener noreferrer"
        className="side-link">
        <EditIcon />
        Edit on GitHub
      </a>
    </Div>
  )
}
