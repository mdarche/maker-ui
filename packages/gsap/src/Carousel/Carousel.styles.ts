const styles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  zIndex: 0,
  button: {
    zIndex: 100,
  },
  '.slide-container': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    touchAction: 'none',
    cursor: 'pointer',
    '&.dragging': {
      cursor: 'grabbing',
    },
  },
  '.slide': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    flexShrink: 0,
  },
  '.slide-inner': {
    height: '100%',
    width: '100%',
  },
}

export default styles
