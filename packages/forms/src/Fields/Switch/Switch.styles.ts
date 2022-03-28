import { StyleObject } from '@maker-ui/css'

const styles: StyleObject = {
  position: 'relative',
  display: 'inline-block',
  input: {
    position: 'absolute',
    top: -5,
    left: -5,
    opacity: 0,
    outline: 0,
    zIndex: 100,
  },
  label: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: '1px 5px',
    transition: 'all ease .3s',
    outline: 0,
  },
  '.switch-slider': {
    display: 'block',
    position: 'absolute',
    background: '#fff',
    zIndex: 1,
    right: '50%',
    transition: 'all ease 0.3s',
    transitionProperty: 'left, right',
    '&.on': {
      left: '50%',
    },
  },
}
export default styles
