import { useTransition } from "react-spring"

// Transitions
const fade = {
  key: "fade",
  options: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  },
}

const fadeInUp = {
  key: "fadeInUp",
  options: {
    from: { opacity: 0, transform: `translateY(10px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(10px)` },
  },
}

const fadeInDown = {
  key: "fadeInDown",
  options: {
    from: { opacity: 0, transform: `translateY(-10px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(-10px)` },
  },
}

const styles = [fade, fadeInUp, fadeInDown]

// TODO handle config and set default animation
export const transitions = (toggle, type, config) => {
  return useTransition(toggle, null, styles.find(s => s.key === type).options)
}
