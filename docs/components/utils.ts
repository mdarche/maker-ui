import { MenuProps } from 'maker-ui'

/**
 * Recursively flatten an array of MenuItems
 */

export function flatten(arr: MenuProps[]) {
  return arr.reduce((flattened, { path, label, submenu }) => {
    return flattened
      .concat([{ path, label }])
      .concat(submenu ? flatten(submenu) : [])
  }, [])
}
