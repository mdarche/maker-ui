import variants from './variants'

export default {
  initialColorModeName: 'light',
  colors: {
    text: '#333',
    background: '#fff',
    primary: '#1858dc',
    secondary: '#355cac',
    accent: '#1858dc',
    muted: '#f6f6f6',
    border: '#e6e6e6',
    bg_topbar: '#355cac',
    bg_header: '#fff',
    bg_mobileNav: 'rgba(0, 0, 0, 0.9)',
    bg_sideNav: '#eee',
    bg_footer: '#fff',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#1858dc',
        secondary: '#355cac',
        accent: '#1858dc',
        muted: '#f6f6f6',
        border: '#e6e6e6',
        bg_topbar: '#355cac',
        bg_header: '#000',
        bg_mobileNav: 'rgba(0, 0, 0, 0.9)',
        bg_sideNav: '#eee',
        bg_footer: '#fff',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  breakpoints: ['768px', '960px', '1240px'],
  styles: {
    root: {
      body: {
        m: 0,
      },
    },
    h1: {
      fontSize: 60,
    },
    pre: {
      mt: 0,
    },
    code: {
      p: 3,
      fontSize: 2,
    },
  },
  // Maker UI layout variants
  ...variants,
}
