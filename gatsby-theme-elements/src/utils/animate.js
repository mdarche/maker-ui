import { useTransition, useSpring } from "react-spring"

// TODO - refactor with minus (-) sign logic & switch statement

const transitionTypes = width => ({
  fade: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  },
  fadeInUp: {
    from: { opacity: 0, transform: `translateY(10px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(10px)` },
  },
  fadeInDown: {
    from: { opacity: 0, transform: `translateY(-10px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(-10px)` },
  },
  slideRight: {
    from: { transform: `translateX(-${width})` },
    enter: { transform: `translateX(0)` },
    leave: { transform: `translateX(-${width})` },
  },
  slideLeft: {
    from: { transform: `translateX(${width})` },
    enter: { transform: `translateX(0)` },
    leave: { transform: `translateX(${width})` },
  },
})

export const transitions = (toggle, type, width, config) => {
  return useTransition(toggle, null, {
    ...transitionTypes(width)[`${type}`],
    config,
  })
}

export const reveal = (toggle, viewportX, breakpoint, width, config) => {
  const unit = width.replace(/[0-9.]/g, "")
  return useSpring({
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? `translateX(0${unit})` : `translateX(-${width})`,
    },
    from: {
      opacity: viewportX > breakpoint ? 0 : 1,
      transform:
        viewportX > breakpoint
          ? `translateX(0${unit})`
          : `translateX(-${width})`,
    },
    config,
  })
}
