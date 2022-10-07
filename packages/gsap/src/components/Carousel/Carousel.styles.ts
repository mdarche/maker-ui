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
    // touchAction: 'none',
    cursor: 'pointer',
    '&.dragging': {
      cursor: 'grabbing',
    },
  },
  '.slide': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  '.slide-inner': {
    height: '100%',
    width: '100%',
  },
  '.dt-overlay': {
    position: 'absolute',
    // touchAction: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}

export default styles
