/** @jsx jsx */
import { jsx } from "theme-ui"
import { useEffect } from "react"
import PropTypes from "prop-types"
import { useMeasurements } from "../context/MeasureContext"
import { useLayout } from "../context/UIContext"

const ContentWrapper = ({
  maxWidth,
  gridGap,
  layout = "content",
  mobileReverse = true,
  ...props
}) => {
  const { sidebarWidth, sideNavWidth } = useMeasurements()
  const [siteLayout, setLayout] = useLayout()

  useEffect(() => {
    if (layout !== siteLayout) {
      setLayout(layout)
    }
  }, [])

  // Partials

  const layoutPartial = () => {
    const gap = gridGap ? { gridGap } : { variant: "gaps.contentGap" }
    const display = { display: "block" }
    const max = { maxWidth: maxWidth || "max_content" }

    switch (layout) {
      case "sidebar-content":
        return {
          display: "grid",
          px: ["20px", 0],
          gridTemplateColumns: [`1fr`, `${sidebarWidth} 1fr`],
          "#primary-sidebar": {
            gridRow: mobileReverse ? [2, "auto"] : [1, "auto"],
          },
          ...gap,
          ...max,
        }
      case "content-sidebar":
        return {
          display: "grid",
          px: ["20px", 0],
          gridTemplateColumns: [`1fr`, `1fr ${sidebarWidth}`],
          ...gap,
          ...max,
        }
      case "sidenav-content":
        return { pl: [0, sideNavWidth], ...display }
      case "content-sidenav":
        return { pr: [0, sideNavWidth], ...display }
      default:
        return { ...display, ...max }
    }
  }

  return (
    <div
      {...props}
      id="content-wrapper"
      sx={{
        m: "auto",
        ...layoutPartial(),
      }}
    />
  )
}

ContentWrapper.propTypes = {
  mobileReverse: PropTypes.bool,
  layout: PropTypes.string,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  gridGap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node.isRequired,
}

export default ContentWrapper
