import React from 'react'
import { Flex, Box } from 'theme-ui'

const Pagination = ({ current, set, count }) => {
  let indicators = []

  for (let i = 0; i <= count; i++) {
    indicators.push(
      <Box
        key={i}
        variant="carousel.page"
        onClick={e => set(i)}
        className={`carousel-page ${current === i && 'active'}`}
        sx={{
          mx: 1,
          height: 10,
          width: 10,
          borderRadius: '50%',
          bg: 'rgba(0, 0, 0, 0.25)',
          '&.active': { bg: '#000' },
        }}
      />
    )
  }

  return (
    <Flex
      variant="carousel.pagination"
      sx={{ alignItems: 'center', zIndex: 1 }}>
      {indicators}
    </Flex>
  )
}

export default Pagination
