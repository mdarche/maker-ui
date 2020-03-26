import React, { Fragment } from 'react'
import { Box } from 'theme-ui'

// TODO - format controls for mobile

// TODO - move all sx props to variants

const DefaultArrow = () => (
  <Box
    as="svg"
    sx={{ height: 30, fill: '#fff' }}
    viewBox="0 0 39 70"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </Box>
)

const Controls = React.forwardRef(({ controls, arrow }, ref) => {
  const position = isNext => (isNext ? { right: '10px' } : { left: '10px' })
  const transform = isNext =>
    isNext
      ? { transform: ['translateY(0)', 'translateY(-50%)'] }
      : {
          transform: [
            'translateY(0) rotate(180deg)',
            'translateY(-50%) rotate(180deg)',
          ],
        }

  const NavButton = React.forwardRef(({ isNext = false }, ref) => (
    <Box
      ref={ref}
      as="button"
      title={isNext ? 'Next' : 'Previous'}
      aria-label={isNext ? 'Next' : 'Previous'}
      variant={isNext ? `lightbox.next` : `lightbox.prev`}
      className={`lightbox-nav ${isNext ? 'next' : '-prev'}`}
      onClick={isNext ? controls.next : controls.prev}
      sx={{
        variant: 'lightbox.nav',
        cursor: 'pointer',
        bg: 'rgba(0, 0, 0, 0.25)',
        padding: ['20px 40px', '20px'],
        width: ['calc(50% - 15px)', 'auto'],
        border: 'none',
        position: 'absolute',
        height: ['auto', '10vh'],
        top: ['initial', '50%'],
        bottom: ['10px', 'initial'],
        zIndex: 1,
        transition: 'all ease .3s',
        ...transform(isNext),
        ...position(isNext),
        '&:hover, &:focus': {
          bg: 'rgba(0, 0, 0, 0.66)',
        },
        '&:focus': {
          outline: '2px solid #fff',
        },
      }}>
      {arrow || <DefaultArrow />}
    </Box>
  ))

  return (
    <Fragment>
      <NavButton />
      <NavButton isNext ref={ref} />
    </Fragment>
  )
})

export default Controls
