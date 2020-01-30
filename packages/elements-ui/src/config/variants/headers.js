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
    default:
      return { active: base }
  }
}

export default options => ({
  eui_header: {
    base: {
      position: 'relative',
      m: '0 auto',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    default: {
      variant: 'eui_header.base',
      justifyContent: 'space-between',
    },
    center: {
      variant: 'eui_header.base',
      justifyContent: ['space-between', 'center'],
    },
    columns: {
      variant: 'eui_header.base',
      '.col-1': {
        alignItems: 'center',
        width: ['25%', '33%'],
      },
      '.col-2': {
        width: ['50%', '34%'],
        justifyContent: 'center',
        alignItems: 'center',
      },
      '.col-3': {
        width: ['25%', '33%'],
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    },
    submenu: dropdownStyles(options.dropdown.transition),
  },
})
