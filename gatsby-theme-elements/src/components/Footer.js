/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const Footer = props => {
  const { backgroundColor, maxWidth } = props

  return (
    <footer
      sx={{
        p: 3,
        bg: backgroundColor || "bg_footer",
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

Footer.propTypes = {
  backgroundColor: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export default Footer
