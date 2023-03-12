import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn, Conditional, merge } from '@maker-ui/utils'
import type { HeaderOptions, LogoProps } from '@/types'
import { renderNode, stickyClass, isLocal, isObject } from '../utils'

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<HeaderOptions> {
  _mobileMenu?: React.ReactNode
  _type: 'header'
}

/**
 * The `Header` component stores your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @link https://maker-ui.com/docs/layout/header
 */
export const Header = ({
  className,
  absolute,
  navType = 'basic',
  navTypeMobile = 'basic',
  sticky,
  stickyOnMobile,
  stickyUpScroll,
  scrollClass,
  logo,
  widgets,
  menu,
  menuSplit,
  menuButton,
  breakpoint,
  _mobileMenu,
  _type = 'header',
  children,
  ...props
}: HeaderProps) => {
  const _logo = isObject(logo)
    ? (merge({ path: '/' }, logo) as LogoProps)
    : (logo as React.ReactNode)

  return (
    <header
      className={cn([
        'mkui-header',
        stickyUpScroll ? 'sticky-scroll' : stickyClass(sticky, stickyOnMobile),
        absolute ? 'abs width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      <div
        className={cn(['mkui-nav', navType, `m-${navTypeMobile}`, className])}>
        <div className="nav-area button-slot">{renderNode(menuButton)}</div>
        {navType === 'split' ? (
          <div className="nav-area menu-slot split">{renderNode(menu)}</div>
        ) : null}
        <div className="nav-area logo-slot">
          {React.isValidElement(_logo) ? (
            _logo
          ) : isObject(_logo) ? (
            <Conditional
              condition={isLocal(_logo.path)}
              trueWrapper={(c) => <Link href={_logo.path as string}>{c}</Link>}
              falseWrapper={(c) => (
                <a href={_logo.path} target="_blank" rel="noreferrer">
                  {c}
                </a>
              )}>
              <>
                {_logo?.image ? (
                  <Image {..._logo.image} />
                ) : _logo.icon ? (
                  _logo.icon
                ) : null}
              </>
            </Conditional>
          ) : null}
        </div>
        <div className="nav-area menu-slot">
          {navType === 'split' ? renderNode(menuSplit) : renderNode(menu)}
        </div>
        <div className="nav-area widget-slot">{widgets}</div>
      </div>
      {_mobileMenu ?? null}
    </header>
  )
}

Header.displayName = 'Header'
Header.defaultProps = { _type: 'header' }
