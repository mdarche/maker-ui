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
      return { ...fade, active: base }
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
          transition: 'opacity .03s 0s ease-in-out',
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
  eui_submenu: {
    ...dropdownStyles(type),
  },
})
