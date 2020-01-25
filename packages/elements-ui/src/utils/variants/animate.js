const right = {
  transform: 'translateX(100%)',
}

const left = {
  transform: 'translateX(-100%)',
}

export default {
  eui_animate: {
    fadeInUp: {
      transform: 'translateY(20px)',
    },
    fadeInDown: {
      transform: 'translateY(-20px)',
    },
    fadeInRight: {
      ...right,
    },
    fadeInLeft: {
      ...left,
    },
    slideRight: {
      ...right,
    },
    slideLeft: {
      ...left,
    },
  },
}
