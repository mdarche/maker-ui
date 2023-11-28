import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useLightbox } from './Provider'
import { DefaultArrow } from './Icons'

interface NavButtonProps {
  type: 'prev' | 'next'
}

/**
 * The `NavButton` controls previous / next button clicks from the LightboxModal.
 *
 * @internal
 */
export const NavButton = ({ type }: NavButtonProps) => {
  const { settings, setIndex } = useLightbox()
  const isNext = type === 'next' ? true : false

  return (
    <button
      title={isNext ? 'Next' : 'Previous'}
      aria-label={isNext ? 'Next' : 'Previous'}
      className={cn(['mkui-lbx-btn-nav', isNext ? 'next' : 'prev'])}
      onClick={() => setIndex(isNext ? 'next' : 'previous')}>
      {settings?.arrowIcon || <DefaultArrow />}
    </button>
  )
}

NavButton.displayName = 'LightboxNavButton'
