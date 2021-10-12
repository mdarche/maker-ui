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
      callout_suggestion_code: '#b1f2ab',
      callout_alert: '#feebeb',
      callout_alert_accent: '#e22624',
      callout_alert_code: '#ffc8c5',
      callout_hint: '#f1efff',
      callout_hint_accent: '#7662d5',
      callout_hint_code: '#ded8fd',
      shadow_code: '1px 1px 2px rgba(5, 19, 52, 0.15)',
      shadow_pre: '1px 5px 15px rgba(3, 10, 27, 0.4)',
      shadow_suggestion: '0px 10px 13px 1px rgba(38, 67, 38, 0.15)',
      shadow_alert: '0px 9px 13px -2px rgba(90, 37, 37, 0.2)',
      shadow_hint: '1px 3px 5px 0px rgba(143, 138, 169, 0.39)',
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
    breakpoint: 0,
    showColorButton: false,
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
    // isPrimaryMobileNav: true,
    // showToggleOnMobile: false,
    // collapse: true,
  },
}
