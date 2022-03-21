/**
 * Import and combine all custom style partials
 */
import layout from './layout'
import global from './global'

export const styles = {
  ...global,
  ...layout,
}
