import merge from 'deepmerge'

/**
 * Maker UI styles for header nav dropdown menus
 *
 * @internal only
 *
 */

const base = {
  opacity: 1,
  visibility: 'visible',
}

const fade = {
  transition: 'all ease .3s',
}

export const activeDropdownStyles = type => {
  switch (type) {
    case 'scale':
      return {
        transform: 'scale(1, 1)',
        li: { opacity: 1, transition: 'opacity ease-in-out .2s .2s' },
      }
    case 'fade-down':
    case 'fade-up':
      return { ...base, transform: 'translateY(0)' }
    case 'fade':
    default:
      return base
  }
}

export const baseDropdownStyles = type => {
  switch (type) {
    case 'scale':
      return {
        ...base,
        transform: 'scale(1, 0)',
        transformOrigin: '0 0',
        transition: 'transform ease-in-out .25s',
        li: {
          opacity: 0,
          transition: 'opacity .03s ease-in-out',
        },
      }
    case 'fade-up':
      return { ...fade, transform: 'translateY(10px)' }
    case 'fade-down':
      return { ...fade, transform: 'translateY(-10px)' }
    case 'fade':
      return { ...fade, transform: 'translateY(0)' }
    default:
      return {}
  }
}

// Dropdown navigation styles

const sharedStyles = {
  display: 'inline-block',
  bg: 'bg_header',
  width: 'max-content',
  opacity: 0,
  visibility: 'hidden',
  m: 0,
  p: 0,
  zIndex: 1,
  listStyle: 'none',
  a: {
    width: '100%',
  },
  li: {
    display: 'block',
  },
}

const rootStyles = {
  position: 'absolute',
  top: '99%',
  left: 0,
}

const nestedStyles = {
  position: 'fixed',
  height: '100%',
  left: '100%',
  top: 0,
}

export const generateStyles = (
  isHeader: boolean,
  type: string,
  depth: number
) => {
  let styles = depth === 0 ? rootStyles : nestedStyles

  return isHeader
    ? merge.all([sharedStyles, styles, baseDropdownStyles(type)], {
        arrayMerge: (_, source, __) => source,
      })
    : {}
}

// Default dropdown caret

export const caretStyles = {
  content: '""',
  display: 'inline-block',
  width: 0,
  height: 0,
  ml: '.4em',
  verticalAlign: '.25em',
  borderTop: '.25em solid',
  borderRight: '.25em solid transparent',
  borderLeft: '.25em solid transparent',
}
