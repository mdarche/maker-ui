import { ColorButton } from 'maker-ui/layout'
import { GithubIcon, ContrastIcon, SunIcon, MoonIcon } from '@/components'

export const NavWidgets = () => {
  return (
    <div className="mkui-nav-widgets flex align-center">
      <a
        href="https://github.com/mdarche/maker-ui"
        className="btn-github"
        target="_blank"
        rel="noopener noreferrer">
        <GithubIcon />
      </a>
      <ColorButton
        themes={{
          light: <SunIcon />,
          dark: <MoonIcon />,
          system: <ContrastIcon />,
        }}
      />
    </div>
  )
}
