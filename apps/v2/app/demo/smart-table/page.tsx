'use client'
import { Section } from 'maker-ui'
import { SmartTable } from 'maker-ui/data'
import { userColumns, users } from '../smart-grid/seed'

export default function SmartTablePage() {
  return (
    <Section>
      <SmartTable
        data={users}
        columns={userColumns}
        settings={{
          pagination: 'input',
          itemsPerPage: 10,
          reorder: true,
          search: {
            columns: ['name', 'age'],
          },
        }}
        onRowClick={(row) => console.log(row)}
        styles={
          {
            // stickyHeader: true,
            // stickyHeaderTop: 'var(--height-header)',
            // cellPadding: 10,
            // headerColor: '#fff',
            // headerBackground: 'var(--color-secondary)',
            // fontSize: 13,
            // headerFontSize: 16,
            // headerPadding: 20,
            // fontFamily: 'monospace',
            // borderColor: '#dee2e6',
            // altRowBackground: '#f8f9fa',
            // hoverRowBackground: 'red',
          }
        }
      />
    </Section>
  )
}
