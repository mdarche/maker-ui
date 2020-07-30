/**
 * Internal Maker UI variants for header nav dropdown menus
 *
 * @internal only
 *
 */

const base = {
  opacity: 1,
  visibility: 'visible',
}

const fade = {
  transition: 'all ease .3s',
}

const dropdownStyles = type => {
  switch (type) {
    case 'fade':
      return { transform: 'translateY(0)', ...fade, active: base }
    case 'fadeInDown':
      return {
        transform: 'translateY(-10px)',
        ...fade,
        active: { ...base, transform: 'translateY(0)' },
      }
    case 'fadeInUp':
      return {
        transform: 'translateY(-10px)',
        ...fade,
        active: { ...base, transform: 'translateY(0)' },
      }
    case 'scale': {
      return {
        transform: 'scale(1, 0)',
        transformOrigin: '0 0',
        transition: 'transform ease-in-out .25s',
        ...base,
        li: {
          opacity: 0,
          transition: 'opacity .03s ease-in-out',
        },
        active: {
          transform: 'scale(1, 1)',
          li: { opacity: 1, transition: 'opacity ease-in-out .2s .2s' },
        },
      }
    }
    default:
      return { active: base }
  }
}

export default type => ({
  mui_submenu: {
    position: 'absolute',
    display: 'inline-block',
    bg: 'bg_header',
    width: 'max-content',
    top: '99%',
    left: 0,
    opacity: 0,
    visibility: 'hidden',
    m: 0,
    p: 0,
    zIndex: 1,
    listStyle: 'none',
    a: {
      width: '100%',
    },
    ul: {
      position: 'fixed',
      height: '100%',
      left: '100%',
      top: 0,
    },
    li: {
      display: 'block',
    },
    ...dropdownStyles(type),
  },
  mui_caret: {
    content: '""',
    display: 'inline-block',
    width: 0,
    height: 0,
    ml: '.4em',
    verticalAlign: '.25em',
    borderTop: '.25em solid',
    borderRight: '.25em solid transparent',
    borderLeft: '.25em solid transparent',
  },
})
