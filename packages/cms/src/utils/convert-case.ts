type SnakeToCamel<T> = T extends Record<string, any>
  ? {
      [K in keyof T as K extends string
        ? Uncapitalize<CamelToSnake<K>>
        : never]: SnakeToCamel<T[K]>
    }
  : T

type CamelToSnake<T extends string> = T extends `${infer Head}${infer Rest}`
  ? `${Head extends Uppercase<Head>
      ? `_${Lowercase<Head>}`
      : Head}${CamelToSnake<Rest>}`
  : ''

type CaseFormat = 'snake' | 'camel'

export function convertCase<T>(
  obj: T,
  caseFormat: CaseFormat
): SnakeToCamel<T> {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertCase(item, caseFormat)) as any
  } else if (typeof obj === 'object' && obj !== null) {
    const convertedObj: any = {}
    const keys = Object.keys(obj)
    for (const key of keys) {
      let newKey = key
      if (caseFormat === 'snake') {
        newKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        newKey = newKey.startsWith('_') ? newKey.slice(1) : newKey
      } else if (caseFormat === 'camel') {
        newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
      }
      convertedObj[newKey as keyof typeof convertedObj] = convertCase(
        obj[key],
        caseFormat
      )
    }
    return convertedObj
  } else {
    return obj as any
  }
}
