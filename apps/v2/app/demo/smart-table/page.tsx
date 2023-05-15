'use client'
import { Section } from 'maker-ui'
import { FetchDataParams, SmartTable } from 'maker-ui/data'
import { userColumns, users, type ExampleUser } from '../smart-grid/seed'

// Fake network request
function fetchData({
  page,
  sortColumn,
  itemsPerPage,
  sortDirection,
  searchColumns,
  searchQuery,
}: FetchDataParams<ExampleUser>): Promise<ExampleUser[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...users]

      // Sorting
      if (sortColumn) {
        result.sort((a, b) => {
          if (a[sortColumn] < b[sortColumn])
            return sortDirection === 'asc' ? -1 : 1
          if (a[sortColumn] > b[sortColumn])
            return sortDirection === 'asc' ? 1 : -1
          return 0
        })
      }

      console.log('searchColumns', searchColumns)
      console.log('searchQuery', searchQuery)

      // Filtering
      if (searchQuery && searchColumns.length > 0) {
        const query = searchQuery.toLowerCase()
        result = result.filter((item) =>
          searchColumns.some((columnKey) =>
            item[columnKey]?.toString().toLowerCase().includes(query)
          )
        )
      }

      // Pagination
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = page * itemsPerPage
      result = result.slice(startIndex, endIndex)

      resolve(result)
    }, 1000) // Adjust this to simulate different network conditions
  })
}

export default function SmartTablePage() {
  return (
    <Section>
      <SmartTable
        // data={users}
        fetchData={fetchData}
        totalCount={users.length}
        columns={userColumns}
        settings={{
          pagination: 'input',
          itemsPerPage: 3,
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
