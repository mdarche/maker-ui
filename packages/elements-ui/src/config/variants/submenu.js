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

export default type => ({
  eui_submenu: {
    ...dropdownStyles(type),
  },
})
