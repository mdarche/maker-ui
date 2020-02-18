import React from 'react'
import { Box } from 'theme-ui'

const getAttributes = (isHeader, set) =>
  isHeader
    ? {
        onFocus: e => set(true),
        onBlur: e => set(false),
        onClick: e => set(false),
      }
    : null

// TODO - Add dropdown menu svg, set fill to text

const Dropdown = ({
  submenu,
  active,
  set,
  isHeader,
  menuControls,
  pathname,
}) => (
  <React.Fragment>
    {!isHeader && (
      <Box
        as="button"
        className="submenu-toggle"
        aria-expanded={active ? 'true' : 'false'}
        aria-label="View More"
        title="View More"
        onClick={() => set(!active)}>
        More
      </Box>
    )}
    {(!isHeader && active) || isHeader ? (
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
                variant: 'eui_submenu',
                '&.active': {
                  variant: 'eui_submenu.active',
                },
              }
            : {}
        }>
        {submenu.map(({ label, path, newTab, classes = '', icon }, index) => (
          <Box as="li" key={index} className={`menu-item ${classes}`}>
            <a
              href={path}
              className={pathname === path ? 'current' : undefined}
              target={newTab && '_blank'}
              rel={newTab && 'noopener noreferrer'}
              aria-label={icon ? label : undefined}
              aria-current={pathname === path ? 'page' : undefined}
              {...getAttributes(isHeader, set)}
              {...menuControls}>
              {icon && <span className="sub-link-icon">{icon}</span>}
              <span className="sub-link-text">{label}</span>
            </a>
          </Box>
        ))}
      </Box>
    ) : null}
  </React.Fragment>
)

export default Dropdown
