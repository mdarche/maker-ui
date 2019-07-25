import { useTransition, useSpring } from "react-spring"

// Default Mobile Nav Animations

const transitionTypes = (width, type) => {
  const down = type.slice(-1) === "n" ? "-" : ""
  const right = type.slice(-2) === "ht" ? "-" : ""

  switch (type.toLowerCase()) {
    case "fadeinup":
    case "fadeindown":
      return {
        from: { opacity: 0, transform: `translateY(${down}10px)` },
        enter: { opacity: 1, transform: `translateY(0)` },
        leave: { opacity: 0, transform: `translateY(${down}10px)` },
      }
    case "slideright":
    case "slideleft":
      return {
        from: { transform: `translateX(${right + width})` },
        enter: { transform: `translateX(0)` },
        leave: { transform: `translateX(${right + width})` },
      }
    default:
      // Default fade
      return {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      }
  }
}

// Transitions

export const transitions = (toggle, type, width, config) => {
  return useTransition(toggle, null, {
    ...transitionTypes(width, type),
    config,
  })
}

// Springs

export const reveal = (toggle, viewportX, breakpoint, width, config) => {
  const unit = width.replace(/[0-9.]/g, "")
  return useSpring({
    to: {
      opacity: toggle ? 1 : 0,
      transform: toggle ? `translateX(0${unit})` : `translateX(-${width})`,
    },
    from: {
      opacity: 1,
      transform:
        viewportX > breakpoint
          ? `translateX(0${unit})`
          : `translateX(-${width})`,
    },
    config,
  })
}
