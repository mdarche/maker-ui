import Link from 'next/link'
import 'maker-ui/forms.css'
import './layout.scss'

const pages = [
  { label: 'Simple', path: 'simple' },
  { label: 'Dynamic', path: 'dynamic' },
  { label: 'All Fields', path: 'all-fields' },
  { label: 'Paginated', path: 'paginated' },
  { label: 'Custom Field', path: 'custom' },
  { label: 'Grouped', path: 'group' },
  { label: 'Paginated Group', path: 'paginated-group' },
  { label: 'Calendar', path: 'calendar' },
  { label: 'Password', path: 'password' },
  { label: 'Repeater', path: 'repeater' },
]

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="form-layout flex">
      <div className="form-nav">
        <ul>
          {pages.map((p) => (
            <li key={p.path}>
              <Link href={`/components/forms/${p.path}`}>{p.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-body">
        <div className="form-container">{children}</div>
      </div>
    </div>
  )
}
