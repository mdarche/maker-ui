import React from 'react'
import { Box } from 'theme-ui'

const getAttributes = (isHeader, set) =>
  isHeader
    ? {
        onFocus: () => set(true),
        onBlur: () => set(false),
        onClick: () => set(false),
      }
    : null

const Dropdown = ({ submenu, active, set, location, isHeader }) => (
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
              target={newTab && '_blank'}
              rel={newTab && 'noopener noreferrer'}
              className={location === path ? 'active-link' : ''}
              aria-label={icon ? label : null}
              {...getAttributes(isHeader, set)}>
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
