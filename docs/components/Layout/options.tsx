import * as React from 'react'
import { MakerUIOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerUIOptions = {
  fonts: {
    heading: 'Helvetica Neue, Arial, sans-serif',
    body: 'Helvetica Neue, Arial, sans-serif',
    monospace: 'monospace',
  },
  colors: {
    light: {
      text: '#000',
      link: '#3B67BC',
      link_hover: '#aa1aae',
      primary: '#3B67BC',
      background: '#fff',
      border: '#F0F2F7',
      border_dark: '#dce5f1',
      border_theme: '#c2d4f7',
      header_fill: '#282935',
      callout_suggestion: '#e6fde6',
      callout_suggestion_accent: '#2cc320',
      callout_suggestion_code: '#a0f998',
      callout_alert: '#feebeb',
      callout_alert_accent: '#e22624',
      callout_alert_code: '#ffc8c5',
      callout_info: '#f1efff',
      callout_info_accent: '#7662d5',
      callout_info_code: '#ded8fd',
      shadow_pre: '1px 5px 15px rgba(3, 10, 27, 0.4)',
      shadow_callout: '1px 3px 5px 0px rgba(143, 138, 169, 0.39)',
      muted: '#a2adbf',
      muted_text: '#555',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_sideNav: '#FBFCFF',
      bg_mobileMenu: '#000',
      bg_code: '#f2f3f9',
    },
    dark: {
      text: '#fff',
      link: 'red',
      link_hover: 'green',
      primary: 'blue',
      background: '#000',
      bg_header: '#fff',
      bg_dropdown: '#fff',
      bg_sideNav: '#fff',
    },
  },
  useColorDefaults: false,
  header: {
    maxWidth: '100%',
    navType: 'basic-left',
    sticky: true,
    stickyOnMobile: true,
    breakpoint: 1000,
    showColorButton: false,
    hideWidgetsOnMobile: false,
    stickyUpScroll: {
      delay: 50,
    },
    dropdown: {
      transition: 'fade-down',
    },
  },
  mobileMenu: {
    transition: 'slide-left',
  },
  linkFunction: function nextLink(
    path: string,
    children: React.ReactNode,
    attributes: object,
    icon: React.ReactNode
  ) {
    return (
      <Link href={path}>
        <a {...attributes}>
          {icon ? <span className="label-icon">{icon}</span> : null}
          {children}
        </a>
      </Link>
    )
  },
  content: {
    maxWidth: 1050,
  },
  sideNav: {
    width: 280,
    breakpoint: 1000,
    isPrimaryMobileNav: true,
    showToggleOnMobile: false,
    // collapse: true,
  },
}
