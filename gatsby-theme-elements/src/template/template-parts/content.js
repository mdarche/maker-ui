/** @jsx jsx */
import { jsx } from "theme-ui"

import { ContentWrapper, Main, Sidebar, SideNav } from "../../components"

const placeComponents = (components, position) =>
  position === "left" ? components : components.reverse()

export default ({ options, sideNav, sidebar, children }) => {
  // SideNav layout

  if (options.sideNavActive) {
    const position = options.sideNavPosition
    return (
      <ContentWrapper
        layout={position === "left" ? "sidenav-content" : "content-sidenav"}>
        {placeComponents(
          [
            <SideNav>{sideNav}</SideNav>,
            <Main sx={{ pt: options.paddingTop }}>{children}</Main>,
          ],
          position
        )}
      </ContentWrapper>
    )
  }

  // Sidebar layout

  if (options.sidebarActive) {
    const position = options.sidebarPosition
    return (
      <ContentWrapper
        sx={{ pt: options.paddingTop }}
        layout={position === "left" ? "sidebar-content" : "content-sidebar"}>
        {placeComponents(
          [<Sidebar>{sidebar}</Sidebar>, <Main>{children}</Main>],
          position
        )}
      </ContentWrapper>
    )
  }

  // Default layout

  return (
    <ContentWrapper sx={{ pt: options.paddingTop }}>
      <Main>{children}</Main>
    </ContentWrapper>
  )
}
