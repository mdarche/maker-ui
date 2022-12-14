import { type MakerUIOptions } from '@maker-ui/layout'

export const options: MakerUIOptions = {
  colorThemes: ['light', 'dark', 'system'],
  layout: 'sidenav-content',
  topbar: {
    sticky: false,
    stickyOnMobile: false,
    hideOnMobile: false,
  },
  header: {
    absolute: true, // TODO & Please simplify sticky class disaster
    navType: 'minimal',
    navTypeMobile: 'logo-center',
    sticky: true,
    stickyOnMobile: true,
  },
  mobileMenu: {
    transition: 'slide-left',
    visibleOnDesktop: false,
    closeOnBlur: true,
  },
  sideNav: {
    isHeader: true,
    collapse: true,
    // isPrimaryMobileNav: true,
    // closeOnBlur: true,
    // closeOnRouteChange: true,
    // showToggleOnMobile: true,
    // toggleButton?: React.ReactNode;
    // collapse: boolean;
    // collapseButton?: React.ReactNode;
    // cssTransition?: string;
  },
}
