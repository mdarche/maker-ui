import React from 'react'
import { MakerProps, Button } from 'maker-ui'

import { DefaultArrow } from '../icons'

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

interface NavButtonProps extends MakerProps {
  control?: any // TODO - Revisit this
  arrow?: boolean
  isNext?: boolean
}

/**
 * The `NavButton` controls previous / next button clicks from the LighthouseModal.
 *
 * @internal usage only
 */

export const NavButton = ({
  variant,
  control,
  arrow,
  isNext = false,
}: NavButtonProps) => (
  <Button
    title={isNext ? 'Next' : 'Previous'}
    aria-label={isNext ? 'Next' : 'Previous'}
    variant={variant}
    className={`lb-nav-button ${isNext ? 'next-button' : 'prev-button'}`}
    onClick={control}
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
      transition: 'background-color ease .3s',
      ...transform(isNext),
      ...position(isNext),
      '&:hover, &:focus': {
        bg: 'rgba(0, 0, 0, 0.66)',
      },
      '&:focus': {
        outline: '2px solid rgba(255, 255, 255, 0.35)',
      },
    }}>
    {arrow || <DefaultArrow />}
  </Button>
)
