/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useMeasurements } from "../context/MeasureContext"

const ContentWrapper = ({
  maxWidth,
  gridGap,
  children,
  mobileReverse = true,
  ...props
}) => {
  const { sidebarWidth, sideNavWidth } = useMeasurements()
  const columns =
    children.length > 1
      ? children.map(child => child.type.name)
      : [children.type.name]
  const sidebar = columns.includes("Sidebar") ? true : false
  const sideNav = columns.includes("SideNav") ? true : false

  // Partials

  const sidebarPartial = () => {
    if (sidebar) {
      const gap = gridGap ? { gridGap } : { variant: "gaps.contentGap" }

      const gridLayout =
        columns.indexOf("Sidebar") === 1
          ? {
              gridTemplateColumns: [`1fr`, `1fr ${sidebarWidth}`],
            }
          : {
              gridTemplateColumns: [`1fr`, `${sidebarWidth} 1fr`],
              "#primary-sidebar": {
                gridRow: mobileReverse ? [2, 1] : [1, 2],
              },
            }

      return { ...gap, ...gridLayout }
    }
  }

  const sideNavPartial = sideNav
    ? { pl: [0, sideNavWidth] }
    : { maxWidth: maxWidth || "max_content" }

  return (
    <div
      {...props}
      id="content-wrapper"
      sx={{
        display: sidebar ? "grid" : "block",
        px: "20px",
        m: "auto",
        ...sidebarPartial(),
        ...sideNavPartial,
      }}>
      {children}
    </div>
  )
}

ContentWrapper.propTypes = {
  mobileReverse: PropTypes.bool,
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
