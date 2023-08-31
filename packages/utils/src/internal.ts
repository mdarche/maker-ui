import { cleanObject, formatNumber } from './helper'

export type StyleConfig = {
  prefix: string
  properties: string[]
}

/**
 * Converts a camelCase string into kebab-case.
 *
 * @param s - The input string in camelCase format.
 * @returns The converted string in kebab-case format.
 */
export const camelToKebab = (s: string) => {
  return s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Maps a section of styles to CSS custom properties (variables) with a given prefix.
 * Additionally, it can format certain properties using the `formatProps` parameter.
 *
 * @param sectionStyles - The styles for the specific section.
 * @param prefix - The prefix for the CSS custom property.
 * @param formatProps - An optional array of property keys that should be formatted.
 * @returns An object containing the CSS custom properties.
 */
export const mapStyles = (
  sectionStyles: any,
  prefix: string,
  formatProps?: string[]
) => {
  const styleVariables: { [key: string]: any } = {}

  for (const [key, value] of Object.entries(sectionStyles || {})) {
    const formattedKey = `--${prefix}-${camelToKebab(key)}`
    styleVariables[formattedKey] = formatProps?.includes(key)
      ? formatNumber(value as string | number)
      : value
  }

  return styleVariables
}

/**
 * Generates a set of CSS custom properties based on a provided styles object and configuration.
 * The configuration defines how styles for each section should be transformed into custom properties.
 *
 * @param styles - The styles object containing various sections.
 * @param config - The configuration object that describes how each section should be transformed.
 * @returns An object containing the CSS custom properties.
 */
export const getCssVariables = (
  styles: any,
  config: Record<string, StyleConfig>
) => {
  let result: { [key: string]: any } = {}

  for (const section in config) {
    const { prefix, properties } = config[section]
    result = {
      ...result,
      ...mapStyles(styles[section], prefix, properties),
    }
  }

  return cleanObject(result)
}
