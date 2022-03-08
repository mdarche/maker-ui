export const DefaultValue = ({
  children,
  value,
  note,
}: {
  children: React.ReactNode
  value?: string
  note?: string
}) => {
  return (
    <div className="default-value">
      <span>Default</span>
      <strong>{value || children}</strong>
      {note ? <div className="width-100">{note}</div> : null}
    </div>
  )
}
