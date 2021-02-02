import * as React from 'react'
import { MakerProps, Button } from 'maker-ui'

import { useLightbox } from './LightboxContext'
import { DefaultArrow } from '../icons'

interface NavButtonProps extends MakerProps {
  type: 'prev' | 'next'
}

/**
 * The `NavButton` controls previous / next button clicks from the LighthouseModal.
 *
 * @internal usage only
 */

export const NavButton = ({ type }: NavButtonProps) => {
  const { settings, setIndex } = useLightbox()
  const isNext = type === 'next' ? true : false

  return (
    <Button
      title={isNext ? 'Next' : 'Previous'}
      aria-label={isNext ? 'Next' : 'Previous'}
      className={`lb-nav-button ${isNext ? 'next-button' : 'prev-button'}`}
      onClick={() => setIndex(isNext ? 'next' : 'previous')}
      css={{
        cursor: 'pointer',
        background: 'rgba(0, 0, 0, 0.25)',
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
          background: 'rgba(0, 0, 0, 0.66)',
        },
        '&:focus': {
          outline: '2px solid rgba(255, 255, 255, 0.35)',
        },
      }}>
      {settings.customArrow || <DefaultArrow />}
    </Button>
  )
}

NavButton.displayName = 'LightboxNavButton'

/**
 * Utility for calculating absolute positioning
 */

const position = (isNext: boolean) =>
  isNext ? { right: '10px' } : { left: '10px' }

/**
 * Utility for reflecting the arrow icon
 */

const transform = (isNext: boolean) =>
  isNext
    ? { transform: ['translateY(0)', 'translateY(-50%)'] }
    : {
        transform: [
          'translateY(0) rotate(180deg)',
          'translateY(-50%) rotate(180deg)',
        ],
      }
