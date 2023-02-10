const styles: object = {
  position: 'relative',
  '.hidden': {
    display: 'none',
  },
  '.preview': {
    position: 'relative',
  },
  '.hitbox': {
    position: 'absolute',
    cursor: 'pointer',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  '.drag-area': {
    border: '2px dashed',
    padding: '30px',
    borderColor: 'var(--color-gray_300)',
    background: 'var(--color-gray_100)',
    transition: 'all ease 0.3s',
  },
  '.preview-dropzone .drag-area': {
    cursor: 'poiner',
    border: 'none',
    backgroundColor: 'transparent',
    opacity: 0,
    transition: 'all ease 0.3s',
    svg: {
      fill: '#fff',
    },
    '&.drag-active': {
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
  },
  '.drag-active': { background: 'var(--color-gray_300)' },
  '.icon-upload': {
    fill: 'var(--color-text)',
    height: 45,
    marginBottom: 10,
  },
  '.btn-remove': {
    zIndex: 10,
  },
  '.upload-error': {
    fontSize: 12,
    color: 'var(--color-red)',
    '&.bottom, &.top': {
      left: 0,
      width: '100%',
      textAlign: 'center',
    },
    '&.bottom': {
      top: 'calc(100% + 10px)',
    },
    '&.top': {
      bottom: 'calc(100% + 10px)',
    },
  },
  '&.position-right .preview-container': { marginRight: 20 },
  '&.position-left .preview-container': { marginLeft: 20, order: 1 },
  '&.position-top .preview-container': { marginTop: 20, order: 1 },
  '&.position-bottom .preview-container': { marginBottom: 20 },
  '.preview-container.is-primary-dropzone': { margin: 'auto' },
}

export default styles
