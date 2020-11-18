/**
 * Internal Maker UI variants for page content layouts
 *
 * @internal only
 *
 */

const content = {
  display: 'block',
  maxWidth: 'maxWidth_content',
  mx: 'auto',
}

const sidebar = {
  display: 'grid',
  gridGap: t => t.gap.gap_content,
  maxWidth: 'maxWidth_content',
  mx: 'auto',
}

const sidebarContent = {
  ...sidebar,
  '#primary-sidebar': {
    gridRow: [2, 'auto'],
  },
}

const sideNav = {
  display: 'flex',
  '#content': {
    maxWidth: 'maxWidth_content',
    mx: 'auto',
  },
}

const sideNavContent = {
  ...sideNav,
  '#side-nav': {
    left: 0,
  },
  '#toggle-sidenav': {
    right: 30,
  },
}

const contentSideNav = {
  ...sideNav,
  '#side-nav': {
    right: 0,
  },
  '#toggle-sidenav': {
    left: 30,
  },
}

export const getLayoutStyles = (type: string) => {
  switch (type) {
    case 'content sidebar':
      return sidebar
    case 'content sidenav':
      return contentSideNav
    case 'sidebar content':
      return sidebarContent
    case 'sidenav content':
      return sideNavContent
    case 'content':
    case 'workspace':
    case 'workspace dock':
    case 'dock workspace':
    default:
      return content
  }
}
