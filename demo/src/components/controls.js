/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useRef } from "react"
import { Link } from "gatsby"
import { useSpring, useChain, animated as a } from "react-spring"
import { ReactComponent as CloseIcon } from "../assets/arrow.svg"
import { ReactComponent as LayoutIcon } from "../assets/blocks.svg"

const demos = [
  { label: "Gatsby Docs", path: "/gatsby-docs" },
  { label: "Github", path: "/github" },
  { label: "Blog", path: "/personal-blog" },
  { label: "Search Engine", path: "/search-engine" },
  { label: "Online Course", path: "/online-course" },
]

export default () => {
  const [show, set] = useState(true)

  // TODO - refactor the 'show' checks in this animation chain

  // Animation Part 1
  const opacityRef = useRef()
  const opacity = useSpring({
    opacity: show ? 1 : 0,
    ref: opacityRef,
  })

  // Animation Part 2
  const shiftRef = useRef()
  const shift = useSpring({
    width: show ? "180px" : "0",
    height: show ? "190px" : "0",
    opacity: show ? 1 : 0,
    ref: shiftRef,
  })

  // Animation Part 3
  const buttonRef = useRef()
  const buttonSpring = useSpring({
    width: show ? "60px" : "55px",
    height: show ? "45px" : "55px",
    borderRadius: show ? "0px 0px 0px 15px" : "5px 5px 5px 5px",
    ref: buttonRef,
  })

  useChain([opacityRef, shiftRef, buttonRef], [0, 0.8, 1])

  return (
    <div
      id="elements-control-panel"
      sx={{
        position: "fixed",
        right: [0, "2em"],
        top: ["33%", "40%"],
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}>
      <a.div
        style={shift}
        sx={{
          background: "rgba(0,0,0,0.75)",
          borderRadius: "5px",
          borderBottomRightRadius: 0,
          width: "180px",
          height: "190px",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}>
        <a.nav aria-label="Theme Example Menu" style={opacity}>
          <h4
            sx={{
              color: "#fff",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              m: 0,
              fontWeight: "bold",
              fontSize: "14px",
              p: "10px 20px",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              bg: "rgba(0, 0, 0, 0.4)",
            }}>
            Demos
          </h4>
          <ul
            sx={{
              listStyleType: "none",
              m: 0,
              p: "15px 0 10px",
            }}>
            {demos.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  sx={{
                    color: "rgba(255, 255, 255, 0.71)",
                    display: "flex",
                    p: "0 20px 10px",
                    transition: "color ease .3s",
                    textDecoration: "none",
                    ":hover": {
                      color: "#fff",
                    },
                  }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </a.nav>
      </a.div>
      <a.button
        onClick={() => set(!show)}
        style={buttonSpring}
        sx={{
          background: "rgba(0,0,0,0.75)",
          borderBottomLeftRadius: "15px",
          border: "none",
          width: 60,
          height: 45,
          mt: "5px",
        }}>
        <a.div sx={{ svg: { fill: "#fff", height: 32 } }}>
          {show ? <CloseIcon /> : <LayoutIcon />}
        </a.div>
      </a.button>
    </div>
  )
}
