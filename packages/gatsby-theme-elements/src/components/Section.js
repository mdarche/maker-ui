/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useOptions } from "../context/ElementsContext"

const Section = ({
  background,
  maxWidth,
  padding,
  margin,
  children,
  id,
  ...props
}) => {
  const options = useOptions()

  return (
    <section
      {...props}
      id={id ? id : null}
      sx={{
        background,
      }}>
      <div
        sx={{
          maxWidth: maxWidth || options.content.maxWidth,
          m: margin || "0 auto",
          p: padding || "20px",
        }}>
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Section
