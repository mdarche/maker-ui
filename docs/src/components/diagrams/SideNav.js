/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import theme from "../../gatsby-theme-elements/theme"

export default () => {
  const [color] = useColorMode()
  const activeColor =
    color === "light" ? theme.colors.primary : theme.colors.modes.dark.primary

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 449 364"
      sx={{
        ".dark": { fill: "#dadada" },
        ".darkest": { fill: "#c1c1c1" },
        ".light": { fill: "#efefef" },
        ".active": { fill: activeColor },
      }}>
      <g>
        <path className="light" d="M0 0h449v364H0z" />
        <path className="active" d="M0 72h133v291H0z" id="side-nav" />
        <path class="dark" d="M0 0h449v18H0z" />
        <path class="darkest" d="M0 18h449v54H0z" />
        <path
          class="dark"
          d="M23 29h101v25H23zM159 29h222v25H159zM386 29h43v25h-43z"
        />
        <path class="darkest" d="M159 101h263v231H159z" />
      </g>
    </svg>
  )
}
