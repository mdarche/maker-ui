interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table = ({ children }: TableProps) => {
  return <div className="mkui-table-wrapper">{children}</div>
}
