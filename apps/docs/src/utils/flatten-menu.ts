import { type MenuItem } from 'maker-ui/layout'

/**
 * Recursively flatten an array of MenuItems
 */
export const flattenMenu = (items: MenuItem[]): MenuItem[] => {
  let flatArray: MenuItem[] = []

  for (const item of items) {
    // Add the current item to the flatArray
    flatArray.push(item)

    // If the current item has a submenu, flatten it too
    if (item.submenu) {
      flatArray = flatArray.concat(flattenMenu(item.submenu))
    }
  }

  return flatArray
}
