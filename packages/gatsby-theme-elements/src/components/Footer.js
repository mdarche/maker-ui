import React from "react"
import PropTypes from "prop-types"
import { Footer as ElementsFooter } from "elements-ui"

const Footer = ({
  backgroundColor = "bg_footer",
  borderTop = "1px solid",
  borderColor = "border",
  maxWidth = "max_footer",
  sx,
  ...props
}) => (
  <ElementsFooter
    bg={backgroundColor}
    borderTop={borderTop}
    borderColor={borderColor}
    sx={{
      maxWidth,
      ...sx,
    }}
    {...props}
  />
)

Footer.propTypes = {
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default Footer
