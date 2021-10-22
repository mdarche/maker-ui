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
}

export const Type = ({ name, children }: TypeProps) => {
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
      <div className="type-title">Type</div>
      <div className="type-value">
        {typeName}
        {children}
      </div>
    </div>
  )
}
