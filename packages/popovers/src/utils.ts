/**
 * Utility for parsing transition strings and setting positive or negative value
 *
 * @param {string} type - A transition string ('fade-up', 'slide-right', etc.)
 *
 */
export const getSign = (type: string): string =>
  type.includes('right') || type.includes('down') ? '-' : ''
