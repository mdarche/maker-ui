/** @jsx jsx */
import { jsx } from "theme-ui"

const Footer = props => {
  const { background, maxWidth } = props

  return (
    <footer
      sx={{
        p: 3,
        bg: background || "bg_footer",
        borderTop: "footer",
      }}
    >
      <div
        {...props}
        sx={{
          m: "0 auto",
          maxWidth: maxWidth || "max_footer",
        }}
      />
    </footer>
  )
}

export default Footer
