import React from 'react'

import { Box, SVG, Button, Link } from './Box'
import { MenuProps } from '../props'

interface DropdownProps {
  submenu: MenuProps[]
  active: boolean
  set: any
  isHeader: boolean
  menuControls: object
  pathname: string
}

const getAttributes = (isHeader, set): object | null =>
  isHeader
    ? {
        onFocus: e => set(true),
        onBlur: e => set(false),
        onClick: e => set(false),
      }
    : null

export const Dropdown = ({
  submenu,
  active,
  set,
  isHeader,
  menuControls,
  pathname,
}: DropdownProps) => (
  <React.Fragment>
    {!isHeader && (
      <Button
        title="Expand Section"
        className="submenu-toggle"
        aria-expanded={active ? 'true' : 'false'}
        aria-label="Expand Section"
        onClick={() => set(!active)}
        sx={{ border: 'none', bg: 'transparent' }}>
        <SVG
          viewBox="0 0 16 16"
          width="12"
          height="12"
          sx={{
            transition: 'transform ease .2s',
            transformOrigin: '50% 55%',
            transform: active ? 'rotate(180deg)' : null,
          }}>
          <path
            stroke="currentcolor"
            strokeWidth="2"
            fill="none"
            d="M14 6 L8 12 L2 6"
          />
        </SVG>
      </Button>
    )}
    {isHeader || (!isHeader && active) ? (
      <Box
        as="ul"
        variant={isHeader ? 'header.submenu' : 'accordion'}
        className={`sub-menu ${active ? 'active' : ''}`}
        sx={
          isHeader
            ? {
                position: 'absolute',
                display: 'inline-block',
                width: 'max-content',
                top: '99%',
                left: 0,
                opacity: 0,
                visibility: 'hidden',
                m: 0,
                p: 0,
                zIndex: 1,
                listStyle: 'none',
                variant: 'mui_submenu',
                '&.active': {
                  variant: 'mui_submenu.active',
                },
              }
            : {}
        }>
        {submenu.map(({ label, path, newTab, classes = '', icon }, index) => (
          <Box as="li" key={index} className={`menu-item ${classes}`}>
            <Link
              href={path}
              className={pathname === path ? 'current' : undefined}
              target={newTab && '_blank'}
              rel={newTab && 'noopener noreferrer'}
              aria-label={icon ? label : undefined}
              aria-current={pathname === path ? 'page' : undefined}
              {...getAttributes(isHeader, set)}
              {...menuControls}>
              {icon && <span className="submenu-icon">{icon}</span>}
              <span className="submenu-text">{label}</span>
            </Link>
          </Box>
        ))}
      </Box>
    ) : null}
  </React.Fragment>
)
