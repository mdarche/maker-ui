import React, { useState } from 'react'
import { Box } from 'theme-ui'

import Dropdown from './Dropdown'

const getAttributes = (isHeader, submenu, show, set) =>
  isHeader
    ? {
        onFocus: submenu && (() => set(true)),
        onBlur: submenu && (() => set(false)),
        'aria-expanded': submenu ? (show ? 'true' : 'false') : null,
      }
    : null

const MenuItem = ({
  data: { label, path, newTab, submenu, classes = '', icon },
  caret = false,
  location,
  isHeader = false,
}) => {
  const [show, set] = useState(false)

  return (
    <Box
      as="li"
      className={`menu-item ${classes}`}
      sx={
        isHeader
          ? {
              position: 'relative',
              display: 'inline-flex',
              '&:hover': {
                '.sub-menu': {
                  variant: 'eui_submenu.active',
                },
              },
              '.menu-link-text:after':
                submenu && caret
                  ? {
                      content: '""',
                      display: 'inline-block',
                      width: 0,
                      height: 0,
                      ml: '.4em',
                      verticalAlign: '.25em',
                      borderTop: '.25em solid',
                      borderRight: '.25em solid transparent',
                      borderLeft: '.25em solid transparent',
                    }
                  : null,
            }
          : {}
      }>
      <a
        href={path}
        className={location === path ? 'active-link' : ''}
        target={newTab && '_blank'}
        rel={newTab && 'noopener noreferrer'}
        aria-label={icon ? label : null}
        {...getAttributes(isHeader, submenu, show, set)}>
        {icon && <span className="menu-link-icon">{icon}</span>}
        <span className="menu-link-text">{label}</span>
      </a>
      {submenu ? (
        <Dropdown
          submenu={submenu}
          active={show}
          set={set}
          location={location}
          isHeader={isHeader}
        />
      ) : null}
    </Box>
  )
}

export default MenuItem
