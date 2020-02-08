import React, { useState } from 'react'
import { Box } from 'theme-ui'

//  TODO - Create Ref to calculate ul height, wrap ul inside div with overflow hidden and transform the Y of the parent
const MenuItem = ({ data: { label, path, newTab, submenu }, location }) => {
  const [show, set] = useState(false)

  return (
    <li key={path}>
      <a
        href={path}
        className={location === path ? 'active' : ''}
        target={newTab && '_blank'}
        rel={newTab && 'noopener noreferrer'}>
        {label}
      </a>
      {submenu ? (
        <React.Fragment>
          <Box as="button" onClick={() => set(!show)}>
            More
          </Box>
          {show ? (
            <Box
              as="ul"
              sx={{
                p: 0,
                m: 0,
              }}>
              {submenu.map(({ label, path, newTab }) => (
                <li key={path}>
                  <a href={path} target={newTab && '_blank'}>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </Box>
          ) : null}
        </React.Fragment>
      ) : null}
    </li>
  )
}

export const AccordionMenu = React.forwardRef(
  ({ menu, location, variant = 'accordion-menu', ...props }, ref) => (
    <Box ref={ref} as="ul" variant={variant} {...props}>
      {menu.map((item, index) => (
        <MenuItem key={index} data={item} location={location} />
      ))}
    </Box>
  )
)
