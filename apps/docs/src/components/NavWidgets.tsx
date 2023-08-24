import { ColorButton } from 'maker-ui/layout'
import { cn } from 'maker-ui/utils'
import { GithubIcon, ContrastIcon, SunIcon, MoonIcon } from '@/components'
import { Search } from './Search'

export const SharedWidgets = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(['mkui-nav-widgets shared flex align-center', className])}>
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

export const DesktopWidgets = () => {
  return (
    <div className="mkui-nav-widgets flex align-center">
      <Search />
      <SharedWidgets className="desktop" />
    </div>
  )
}
