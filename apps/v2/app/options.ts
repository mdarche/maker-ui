import { type MakerUIOptions } from '@maker-ui/layout'

export const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'content',
  topbar: {
    sticky: false,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    absolute: false, // TODO & Please simplify sticky class disaster
    navType: 'minimal',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
    stickyUpScroll: false,
    scrollClass: {
      scrollTop: 1000,
      className: 'testss',
    },
  },
  mobileMenu: {
    transition: 'slide-left',
    visibleOnDesktop: false,
    closeOnBlur: true,
    closeOnRouteChange: true,
  },
  sideNav: {
    isHeader: false,
    collapse: true,
    showCollapseOnMobile: true,
    closeOnBlur: true,
    closeOnRouteChange: true,
    // isPrimaryMobileNav: true,
    // collapseButton?: React.ReactNode;
    // cssTransition?: string;
  },
}
