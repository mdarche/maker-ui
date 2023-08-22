import { type MenuItem } from 'maker-ui/layout'

/**
 * Recursively flatten an array of MenuItems
 */
export function flatten(arr: MenuItem[]): MenuItem[] {
  return arr.reduce((flattened, { path, label, submenu }) => {
    return flattened
      .concat([{ path, label }])
      .concat(submenu ? flatten(submenu) : [])
  }, [])
}
$
