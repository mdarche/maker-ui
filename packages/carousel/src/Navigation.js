import React, { Fragment } from 'react'
import { Box } from 'theme-ui'

const DefaultArrow = () => (
  <Box
    as="svg"
    sx={{ height: 30, fill: 'primary' }}
    viewBox="0 0 39 70"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M1.24 7.27L28.63 35.2 1.22 63.15a4.27 4.27 0 000 6 4.27 4.27 0 006.07 0l30.38-30.96a4.28 4.28 0 000-6L7.35 1.28a4.28 4.28 0 00-6.08 0 4.28 4.28 0 00-.03 5.99z" />
  </Box>
)

const Pagination = React.memo(({ variant, controls, arrow }) => {
  const position = isNext => (isNext ? { right: 0 } : { left: 0 })
  const transform = isNext =>
    isNext
      ? { transform: 'translateY(-50%)' }
      : { transform: 'translateY(-50%) rotate(180deg)' }

  const NavButton = ({ isNext = false }) => (
    <Box
      as="button"
      title={`${isNext ? 'Next' : 'Previous'} Slide`}
      aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
      variant={isNext ? `${variant}.next` : `${variant}.prev`}
      className={`carousel-nav ${isNext ? 'carousel-next' : 'carousel-prev'}`}
      onClick={isNext ? controls.next : controls.prev}
      sx={{
        variant: `${variant}.nav`,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        ...transform(isNext),
        ...position(isNext),
      }}>
      {arrow || <DefaultArrow />}
    </Box>
  )

  return (
    <Fragment>
      <NavButton />
      <NavButton isNext />
    </Fragment>
  )
})

export default Pagination
