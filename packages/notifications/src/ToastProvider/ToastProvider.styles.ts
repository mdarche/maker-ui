const styles = {
  display: 'flex',
  position: 'fixed',
  left: 50,
  bottom: 50,
  zIndex: 1000,
  '&.toast-animate-enter .toast': {
    transform: 'scaleX(0)',
    svg: { opacity: 0 },
    span: { opacity: 0 },
  },
  '&.toast-animate-enter-done .toast, &.toast-animate-exit .toast': {
    transform: 'scaleX(1)',
    svg: { opacity: 1 },
    span: { opacity: 1 },
  },
  '&.toast-animate-exit .toast': {
    transform: 'translateY(10px)',
    opacity: 0,
  },
  '.toast': {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 23px 17px 15px',
    borderRadius: 4,
    boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.25)',
    color: '#fff',
    transformOrigin: 'left',
    transition: 'all ease 0.3s',
    svg: {
      height: 20,
      transition: 'opacity 0.2s 0.2s',
      fill: '#fff',
      marginRight: 12,
    },
    span: { transition: 'opacity 0.2s 0.3s' },
  },
  '.ERROR': {
    background: '#D02527',
  },
  '.SAVE': {
    background: '#0da13b',
    svg: { height: 18 },
  },
  '.SUCCESS': {
    background: '#0da13b',
  },
  '.HELP': {
    background: '#7c3df5',
  },
  '.HIDDEN': {
    opacity: 0,
    background: 'rgba(0, 0, 0, 0)',
    boxShadow: '2px 4px 8px rgba(0, 0, 0, 0)',
  },
}

export default styles
