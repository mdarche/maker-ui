/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import theme from "../gatsby-theme-elements/theme"

export default ({ type }) => {
  const [color] = useColorMode()
  const activeColor =
    color === "light" ? theme.colors.primary : theme.colors.modes.dark.primary

  function set(base, name) {
    return type === name ? base.concat(" active") : base
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 193 364"
      sx={{
        ".dark": { fill: "#dadada" },
        ".darkest": { fill: "#c1c1c1" },
        ".light": { fill: "#efefef" },
        ".transparent": { fill: "transparent" },
        ".active": { fill: activeColor },
      }}>
      <g>
        <path className="light" d="M0 0h193v364H0z" />
        <path className="dark" d="M0 0h193v40H0z" />
        <path className="darkest" d="M11 9h96v20H11z" />
        <path className={set("darkest", "menu-toggle")} d="M155 9h29v20h-29z" />
        <path className="dark" d="M12 59h169v283H12z" />
        <path
          className={set("dark", "side-nav-toggle")}
          d="M151 312h30v30h-30z"
        />
        <path className={set("transparent", "tab-bar")} d="M0 325h193v39H0z" />
        <path
          className={set("transparent", "mobile-nav")}
          d="M73 0h120v364H73z"
        />
      </g>
    </svg>
  )
}
