/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useRef } from "react"
import { Link } from "gatsby"
import { useSpring, useChain, animated as a } from "react-spring"
import { ReactComponent as CloseIcon } from "../assets/arrow.svg"
import { ReactComponent as MoreIcon } from "../assets/more.svg"

const demos = [
  { label: "Gatsby Docs", path: "/gatsby-docs" },
  { label: "Github", path: "/github" },
  { label: "Netlify", path: "/netlify" },
  { label: "Blog", path: "/blog" },
  { label: "News Site", path: "/news" },
]

export default () => {
  const [show, set] = useState(true)

  const shiftRef = useRef()
  const shift = useSpring({
    width: show ? "135px" : "0",
    height: show ? "190px" : "0",
    opacity: show ? 1 : 0,
    ref: shiftRef,
  })

  const buttonRef = useRef()
  const buttonSpring = useSpring({
    height: show ? "45px" : "60px",
    borderRadius: show ? "0px 0px 0px 15px" : "35px 35px 35px 35px",
    ref: buttonRef,
  })

  useChain([shiftRef, buttonRef], [0, 0.8, 1])

  return (
    <div
      id="elements-control-panel"
      sx={{
        position: "fixed",
        right: ["20px", "2em"],
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
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}>
        <a.nav aria-label="Theme Example Menu">
          <h4
            sx={{
              color: "#fff",
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
                    whiteSpace: "nowrap",
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
          outline: "none",
        }}>
        <a.div sx={{ svg: { fill: "#fff", height: 32 } }}>
          {show ? <CloseIcon /> : <MoreIcon />}
        </a.div>
      </a.button>
    </div>
  )
}
