import React, { useCallback } from 'react'
import { Box } from 'theme-ui'

const DefaultArrow = () => (
  <Box
    as="svg"
    sx={{ height: 30, fill: 'primary' }}
    viewBox="0 0 17 30"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M16.0549 27.7809C16.0549 29.4665 13.9855 30.2749 12.843 29.0356L1.44467 16.6713C0.738657 15.9054 0.738658 14.7259 1.44467 13.9601L12.843 1.59581C13.9855 0.356501 16.0549 1.16485 16.0549 2.85043C16.0549 3.31534 15.88 3.76322 15.5648 4.10504L6.47975 13.9601C5.77373 14.7259 5.77373 15.9054 6.47975 16.6713L15.5648 26.5263C15.88 26.8681 16.0549 27.316 16.0549 27.7809Z" />
  </Box>
)

const Pagination = ({ set, count, customArrow }) => {
  const next = useCallback(() => set(state => (state + 1) % 3), [])
  const prev = useCallback(
    () => set(state => (state === 0 ? count : state - 1)),
    []
  )

  const position = isNext => (isNext ? { right: 0 } : { left: 0 })
  const transform = isNext =>
    isNext
      ? { transform: 'translateY(-50%)' }
      : { transform: 'translateY(-50%) rotate(180deg)' }

  const NavButton = ({ isNext = false } = (
    <Box
      as="button"
      title={`${isNext ? 'Next' : 'Previous'} Slide`}
      aria-label={`${isNext ? 'Next' : 'Previous'} Slide`}
      variant={isNext ? 'carousel.next' : 'carousel.prev'}
      className={isNext ? 'carousel-next' : 'carousel-prev'}
      onClick={isNext ? next : prev}
      sx={{
        background: 'none',
        border: 'none',
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        ...transform(isNext),
        ...position(isNext),
      }}>
      {{ customArrow } || <DefaultArrow />}
    </Box>
  ))

  return (
    <React.Fragment>
      <NavButton />
      <NavButton isNext />
    </React.Fragment>
  )
}

export default Pagination
