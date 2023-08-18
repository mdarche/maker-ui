import { cn } from 'maker-ui'

export interface TypeProps {
  name?:
    | 'object'
    | 'string'
    | 'number'
    | 'ResponsiveScale'
    | 'boolean'
    | 'ResponsiveString'
    | 'string-number'
  children: React.ReactNode
  multi?: string[]
  required?: boolean
  flex?: boolean
  nested?: {
    [key: string]: string | string[]
  }
}

export const Type = ({
  name,
  multi,
  flex,
  required,
  nested,
  children,
}: TypeProps) => {
  let typeName =
    name === 'ResponsiveScale'
      ? 'string | number | (string | number)[]'
      : name === 'ResponsiveString'
      ? 'string | string[]'
      : name === 'string-number'
      ? 'string | number'
      : name
  return (
    <div className="prop-type">
      {required ? <div className="type-title required">Required</div> : null}
      <div className="type-title">Type</div>
      <div className={cn(['type-value', flex ? 'flex' : undefined])}>
        {multi ? (
          multi.map((text, i) => (
            <div key={i} className="flex multi-line">
              {flex && i === 0 ? null : <span>|</span>} {text}
            </div>
          ))
        ) : nested ? (
          <>
            {`{`}
            {Object.keys(nested).map((k, i) => (
              <div className="nested-type" key={i}>
                <span>{k}</span>:{' '}
                {Array.isArray(nested[k])
                  ? (nested[k] as string[]).map(
                      (v, i) => `${i !== 0 ? ' |' : ''} ${v}`
                    )
                  : nested[k]}
              </div>
            ))}
            {`}`}
          </>
        ) : (
          <>
            {typeName}
            {children}
          </>
        )}
      </div>
    </div>
  )
}
