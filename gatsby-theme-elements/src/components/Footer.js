/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

const Footer = ({ backgroundColor, maxWidth, ...props }) => (
  <footer
    sx={{
      p: 3,
      bg: backgroundColor || "bg_footer",
      borderTop: "footer",
    }}>
    <div
      {...props}
      sx={{
        m: "0 auto",
        maxWidth: maxWidth || "max_footer",
      }}
    />
  </footer>
)

Footer.propTypes = {
  backgroundColor: PropTypes.string,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Footer
